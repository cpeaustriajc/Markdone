// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use comrak::{markdown_to_html, ComrakOptions};
use std::fs;
use std::path::PathBuf;

use serde::Serialize;
use tauri::api::dialog;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu, Window};

#[derive(Clone, Serialize)]
pub struct FileInfo {
    pub file_path: PathBuf,
    pub md: String,
}

#[tauri::command]
fn read_md_file(file_path: &str) -> String {
    let raw_markdown = fs::read_to_string(file_path).expect("Unable to read the file");

    raw_markdown.into()
}

#[tauri::command]
fn process_md_file(raw_markdown: &str) -> String {
    markdown_to_html(raw_markdown, &ComrakOptions::default()).into()
}

fn open_file(file_path: &PathBuf, window: &Window) -> Result<(), ()> {
    let md = read_md_file(file_path.to_str().expect("Could not open file"));

    window.emit_all(
        "open",
        FileInfo {
            md: md,
            file_path: file_path.clone(),
        },
    );

    window.set_title(file_path.file_name().unwrap().to_str().unwrap());

    Ok(())
}

fn main() {
    let open = CustomMenuItem::new("open".to_string(), "Open File");
    let file_menu = Submenu::new("File", Menu::new().add_item(open));
    let menu = Menu::new()
        .add_submenu(file_menu)
        .add_native_item(MenuItem::Separator);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            let event_window = event.window();
            let window_name = event_window.label().to_string();
            let app = event_window.app_handle();
            match event.menu_item_id() {
                "open" => dialog::FileDialogBuilder::default()
                    .add_filter("Markdown", &["md"])
                    .pick_file(move |path_buf| match path_buf {
                        Some(p) => {
                            open_file(&p, &app.windows()[window_name.as_str()])
                                .expect("Could not open the file.");
                        }
                        _ => {}
                    }),
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

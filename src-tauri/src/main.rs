// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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

fn new_file(file_path: &PathBuf, window: &Window) {
    fs::write(file_path, "").expect("Failed to create new file");
    let md = read_md_file(file_path.to_str().expect("Could not open file"));
    let file_name = file_path.file_name().unwrap().to_str().unwrap();

    window
        .emit_all(
            "new",
            FileInfo {
                md,
                file_path: file_path.clone(),
            },
        )
        .expect("Failed to perform operation");

    window
        .set_title(file_name)
        .expect("Failed to set the title");
}

fn save_file(file_path: &PathBuf, window: &Window) {
    window
        .emit_all(
            "save",
            FileInfo {
                md: "".to_string(),
                file_path: file_path.clone(),
            },
        )
        .expect("Failed to perform save operation");
}

fn open_file(file_path: &PathBuf, window: &Window) {
    let md = read_md_file(file_path.to_str().expect("Could not open file"));
    let file_name = file_path.file_name().unwrap().to_str().unwrap();

    window
        .emit_all(
            "open",
            FileInfo {
                md,
                file_path: file_path.clone(),
            },
        )
        .expect("Failed to perform open operation");

    window
        .set_title(file_name)
        .expect("Failed to set the title");
}

fn close_file(window: &Window) {
    window
        .emit_all(
            "open",
            FileInfo {
                md: "".into(),
                file_path: "".into(),
            },
        )
        .expect("Failed to perform close operation");

    window
        .set_title("Markdone")
        .expect("Failed to set the title");
}

fn main() {
    let new_file_item = CustomMenuItem::new("new".to_string(), "New File");
    let open_file_item = CustomMenuItem::new("open".to_string(), "Open File");
    let save_file_item = CustomMenuItem::new("save".to_string(), "Save File");
    let close_file_item = CustomMenuItem::new("close".to_string(), "Close File");
    let file_menu = Submenu::new(
        "File",
        Menu::new()
            .add_item(new_file_item)
            .add_item(open_file_item)
            .add_item(save_file_item)
            .add_item(close_file_item),
    );
    let menu = Menu::new()
        .add_submenu(file_menu)
        .add_native_item(MenuItem::Separator);

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![read_md_file])
        .on_menu_event(|event| {
            let event_window = event.window();
            let window_name = event_window.label().to_string();
            let app = event_window.app_handle();

            match event.menu_item_id() {
                "new" => dialog::FileDialogBuilder::new()
                    .add_filter("Markdown", &["md"])
                    .save_file(move |file_path| match file_path {
                        Some(p) => new_file(&p, &app.windows()[window_name.as_str()]),
                        _ => {}
                    }),
                "open" => dialog::FileDialogBuilder::default()
                    .add_filter("Markdown", &["md"])
                    .pick_file(move |file_path| match file_path {
                        Some(p) => open_file(&p, &app.windows()[window_name.as_str()]),
                        _ => {}
                    }),
                "save" => dialog::FileDialogBuilder::default()
                    .add_filter("Markdown", &["md"])
                    .pick_file(move |file_path| match file_path {
                        Some(p) => save_file(&p, &app.windows()[window_name.as_str()]),
                        _ => {}
                    }),
                "close" => close_file(&app.windows()[window_name.as_str()]),
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

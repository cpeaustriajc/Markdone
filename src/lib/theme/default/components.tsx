import { Components } from "react-markdown"

interface Theme {
  markdown: Partial<Components>
}

export const components: Theme = {
  markdown: {
    h1(props) {
      const { node, ...rest } = props
      return <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl color-prose-h1' {...rest} />
    },
    h2(props) {
      const { node, ...rest } = props
      return <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0' {...rest} />
    },
    h3(props) {
      const { node, ...rest } = props
      return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...rest} />
    },
    h4(props) {
      const { node, ...rest } = props
      return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...rest} />
    },
    p(props) {
      const { node, ...rest } = props
      return <p className='leading-7 [&:not(:first-child)]:mt-6' {...rest} />
    },
    ul(props) {
      const { node, ...rest } = props
      return <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...rest} />
    },
    code(props) {
      const { node, ...rest } = props
      return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...rest} />
    },
    blockquote(props) {
      const { node, ...rest } = props
      return <blockquote className="mt-6 border-l-2 pl-6 italic" {...rest} />
    }
  }
}

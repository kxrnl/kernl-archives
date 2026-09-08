import { markdownToHtml } from "../utils/markdownParser"

import '../styles/Test.css'

function Test() {
    const test: string = markdownToHtml("Test");
    return <span className="markdown" dangerouslySetInnerHTML={{ __html: test }} />;
}

export default Test
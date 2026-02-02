import streamlit as st
import os
from datetime import datetime
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter
import streamlit.components.v1 as components


SUPPORTED_LANGUAGES = {
    "Python": ".py",
    "C": ".c",
    "C++": ".cpp",
    "Java": ".java",
    "JavaScript": ".js",
    "HTML": ".html",
    "CSS": ".css",
    "SQL": ".sql"
}

LEXER_NAMES = {
    "Python": "python",
    "C": "c",
    "C++": "cpp",
    "Java": "java",
    "JavaScript": "javascript",
    "HTML": "html",
    "CSS": "css",
    "SQL": "sql"
}

SAVE_FOLDER = "saved_code"


def ensure_save_folder_exists():
    if not os.path.exists(SAVE_FOLDER):
        os.makedirs(SAVE_FOLDER)


def save_code_to_file(code: str, language: str) -> str:
    ensure_save_folder_exists()
    extension = SUPPORTED_LANGUAGES.get(language, ".txt")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"code_{timestamp}{extension}"
    filepath = os.path.join(SAVE_FOLDER, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(code)

    return filepath


def get_highlighted_html(code: str, language: str) -> str:
    lexer_name = LEXER_NAMES.get(language, "text")
    lexer = get_lexer_by_name(lexer_name)

    formatter = HtmlFormatter(
        noclasses=True,
        style="monokai",
        linenos=True,
        wrapcode=True
    )

    highlighted_code = highlight(code, lexer, formatter)

    html_template = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                margin: 0;
                padding: 0;
                background-color: #1e1e1e;
            }}
            .code-container {{
                background-color: #1e1e1e;
                padding: 16px;
                border-radius: 8px;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                font-size: 14px;
                overflow-x: auto;
            }}
            .linenodiv {{
                padding-right: 10px;
                color: #858585;
                border-right: 1px solid #404040;
                margin-right: 10px;
            }}
            table {{
                border-collapse: collapse;
            }}
            td {{
                padding: 0;
                vertical-align: top;
            }}
            pre {{
                margin: 0;
                white-space: pre;
            }}
        </style>
    </head>
    <body>
        <div class="code-container">
            {highlighted_code}
        </div>
    </body>
    </html>
    """
    return html_template


def main():
    st.set_page_config(
        page_title="Code Editor with Syntax Highlighting",
        page_icon="💻",
        layout="wide"
    )

    st.title(" Code Editor with Syntax Highlighting")
    st.markdown(
        "A simple code editor that supports syntax highlighting for multiple programming languages."
    )

    st.divider()

    col1, col2 = st.columns([3, 1])

    with col2:
        selected_language = st.selectbox(
            "Select Programming Language:",
            options=list(SUPPORTED_LANGUAGES.keys()),
            index=0
        )
        st.info(f" File extension: **{SUPPORTED_LANGUAGES[selected_language]}**")

    with col1:
        code_input = st.text_area(
            "Paste or type your code here:",
            height=300,
            placeholder="Enter your code here..."
        )

    st.divider()

    btn_col1, btn_col2, _ = st.columns([1, 1, 4])

    with btn_col1:
        highlight_button = st.button(" Highlight Code", type="primary", use_container_width=True)

    with btn_col2:
        save_button = st.button(" Save Code", use_container_width=True)

    if save_button:
        if code_input.strip():
            try:
                filepath = save_code_to_file(code_input, selected_language)
                st.success(f" Code saved successfully to: **{filepath}**")
            except Exception as e:
                st.error(f" Error saving file: {str(e)}")
        else:
            st.warning(" Please enter some code before saving.")

    st.divider()

    if highlight_button:
        if code_input.strip():
            try:
                highlighted_html = get_highlighted_html(code_input, selected_language)
                num_lines = code_input.count('\n') + 1
                height = min(max(num_lines * 22 + 50, 200), 800)
                components.html(highlighted_html, height=height, scrolling=True)
            except Exception as e:
                st.error(f" Error highlighting code: {str(e)}")
        else:
            st.warning(" Please enter some code before highlighting.")

    st.divider()


if __name__ == "__main__":
    main()

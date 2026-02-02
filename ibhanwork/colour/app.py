"""
Streamlit Code Editor with Syntax Highlighting
===============================================
A complete Streamlit application that allows users to:
- Paste or type source code
- Select programming language
- Save code to files with correct extensions
- Apply syntax highlighting using Pygments

Author: GitHub Copilot
"""

import streamlit as st
import os
from datetime import datetime

# Pygments imports for syntax highlighting
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter
import streamlit.components.v1 as components

# =============================================================================
# CONFIGURATION
# =============================================================================

# Supported languages with their file extensions
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

# Mapping from display names to Pygments lexer names
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

# Folder to save code files
SAVE_FOLDER = "saved_code"

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def ensure_save_folder_exists():
    """
    Create the save folder if it doesn't exist.
    """
    if not os.path.exists(SAVE_FOLDER):
        os.makedirs(SAVE_FOLDER)


def save_code_to_file(code: str, language: str) -> str:
    """
    Save the code to a file with the appropriate extension.

    Args:
        code: The source code to save
        language: The programming language selected

    Returns:
        The path to the saved file
    """
    ensure_save_folder_exists()

    # Get the file extension for the selected language
    extension = SUPPORTED_LANGUAGES.get(language, ".txt")

    # Generate a unique filename using timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"code_{timestamp}{extension}"
    filepath = os.path.join(SAVE_FOLDER, filename)

    # Write the code to the file
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(code)

    return filepath


def get_highlighted_html(code: str, language: str) -> str:
    """
    Apply syntax highlighting to the code using Pygments.

    Args:
        code: The source code to highlight
        language: The programming language for lexer selection

    Returns:
        HTML string with syntax-highlighted code
    """
    # Get the lexer name for Pygments
    lexer_name = LEXER_NAMES.get(language, "text")

    # Get the lexer by name
    lexer = get_lexer_by_name(lexer_name)

    # Create HTML formatter with inline styles (noclasses=True)
    # Using a dark theme similar to VS Code
    formatter = HtmlFormatter(
        noclasses=True,
        style="monokai",  # Dark theme similar to VS Code
        linenos=True,     # Show line numbers
        cssclass="source",
        wrapcode=True
    )

    # Generate highlighted HTML
    highlighted_code = highlight(code, lexer, formatter)

    # Wrap in a styled container for dark theme appearance
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
            /* Style for line numbers */
            .linenodiv {{
                padding-right: 10px;
                color: #858585;
                border-right: 1px solid #404040;
                margin-right: 10px;
            }}
            /* Override table styles for better appearance */
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


# =============================================================================
# MAIN APPLICATION
# =============================================================================

def main():
    """
    Main function to run the Streamlit application.
    """
    # Page configuration
    st.set_page_config(
        page_title="Code Editor with Syntax Highlighting",
        page_icon="💻",
        layout="wide"
    )

    # Application title and description
    st.title(" Code Editor with Syntax Highlighting")
    st.markdown("""
    A simple code editor that supports syntax highlighting for multiple programming languages.
    Paste your code, select the language, and see it beautifully highlighted!
    """)

    st.divider()

    # ---------------------------------------------------------------------
    # INPUT SECTION
    # ---------------------------------------------------------------------

    # Create two columns for better layout
    col1, col2 = st.columns([3, 1])

    with col2:
        # Language selection dropdown
        st.subheader(" Settings")
        selected_language = st.selectbox(
            "Select Programming Language:",
            options=list(SUPPORTED_LANGUAGES.keys()),
            index=0,  # Default to Python
            help="Choose the programming language for syntax highlighting"
        )

        st.info(f" File extension: **{SUPPORTED_LANGUAGES[selected_language]}**")

    with col1:
        # Code input text area
        st.subheader(" Code Input")
        code_input = st.text_area(
            "Paste or type your code here:",
            height=300,
            placeholder="Enter your code here...",
            help="Paste or type the source code you want to highlight"
        )

    # ---------------------------------------------------------------------
    # ACTION BUTTONS
    # ---------------------------------------------------------------------

    st.divider()

    # Create columns for buttons
    btn_col1, btn_col2, btn_col3 = st.columns([1, 1, 4])

    with btn_col1:
        highlight_button = st.button(" Highlight Code", type="primary", use_container_width=True)

    with btn_col2:
        save_button = st.button(" Save Code", use_container_width=True)

    # ---------------------------------------------------------------------
    # SAVE CODE FUNCTIONALITY
    # ---------------------------------------------------------------------

    if save_button:
        if code_input.strip():
            # Save the code to a file
            try:
                filepath = save_code_to_file(code_input, selected_language)
                st.success(f" Code saved successfully to: **{filepath}**")
            except Exception as e:
                st.error(f" Error saving file: {str(e)}")
        else:
            st.warning("⚠ Please enter some code before saving.")

    # ---------------------------------------------------------------------
    # SYNTAX HIGHLIGHTING FUNCTIONALITY
    # ---------------------------------------------------------------------

    st.divider()

    if highlight_button:
        if code_input.strip():
            st.subheader(" Highlighted Code")

            try:
                # Get the highlighted HTML
                highlighted_html = get_highlighted_html(code_input, selected_language)

                # Calculate dynamic height based on number of lines
                num_lines = code_input.count('\n') + 1
                height = min(max(num_lines * 22 + 50, 200), 800)  # Min 200px, max 800px

                # Render the highlighted code using Streamlit components
                components.html(highlighted_html, height=height, scrolling=True)

            except Exception as e:
                st.error(f" Error highlighting code: {str(e)}")
        else:
            st.warning("️ Please enter some code before highlighting.")

    # ---------------------------------------------------------------------
    # FOOTER
    # ---------------------------------------------------------------------

    st.divider()
    st.markdown("""
    <div style="text-align: center; color: #666;">
        
    </div>
    """, unsafe_allow_html=True)


# =============================================================================
# ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    main()

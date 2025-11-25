"use client";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    Box, IconButton, Tooltip, Snackbar, Typography, Drawer, Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// --- Highlight.js (Next.js / Turbopack Safe) ---
import hljs from "highlight.js/lib/core";

// Register only the languages you need
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);

// Highlight.js theme
import "highlight.js/styles/github.css";

const CodeBlock = ({
    code = "",
    language = "javascript",
    showCopy = true,
    sx = {},
    ...rest
}) => {
    const theme = useTheme();
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    // Highlight effect
    useEffect(() => {
        if (!codeRef.current) return;

        try {
            let result;

            if (language && hljs.getLanguage(language)) {
                result = hljs.highlight(code, {
                    language,
                    ignoreIllegals: true,
                });
            } else {
                result = hljs.highlightAuto(code);
            }

            codeRef.current.innerHTML = result.value;
        } catch (err) {
            codeRef.current.textContent = code;
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setSnackOpen(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setSnackOpen(true);
        }
    };

    return (
        <Box
            component="div"
            sx={{
                position: "relative",
                borderRadius: 1,
                overflow: "hidden",
                bgcolor:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                ...sx,
            }}
            {...rest}
        >
            {showCopy && (
                <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
                    <Tooltip title={copied ? "Copied" : "Copy"}>
                        <IconButton
                            size="small"
                            onClick={handleCopy}
                            aria-label="copy code"
                            sx={{
                                bgcolor: theme.palette.background.paper,
                                boxShadow: 1,
                                "&:hover": {
                                    bgcolor: theme.palette.action.hover,
                                },
                            }}
                        >
                            {copied ? (
                                <CheckIcon fontSize="small" />
                            ) : (
                                <ContentCopyIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            <Box
                component="pre"
                sx={{
                    m: 0,
                    p: 2.5,
                    overflowX: "auto",
                    fontFamily:
                        '"Fira Code", "Source Code Pro", Menlo, monospace',
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    background: "transparent",
                    color: theme.palette.text.primary,

                    "& code": {
                        background: "transparent",
                        color: "inherit",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                    },
                }}
            >
                {/* Must NOT be self-closing */}
                <code ref={codeRef} className={`hljs language-${language}`}></code>
            </Box>

            <Snackbar
                open={snackOpen}
                onClose={() => setSnackOpen(false)}
                autoHideDuration={1500}
                message={
                    copied ? "Code copied to clipboard" : "Unable to copy"
                }
            />
            <Typography
                variant="caption"
                sx={{ position: "absolute", bottom: 4, right: 8, color: "text.secondary" }}
            >
                {language || "auto-detected"}
            </Typography>
        </Box>
    );
};

CodeBlock.propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string,
    showCopy: PropTypes.bool,
    sx: PropTypes.object,
};


// ---------- A Codeblock from a file in the public folder -------------


const FileCodeBlock = ({ filePath, ...props }) => {
    const [code, setCode] = useState("");

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                setCode(text);
            } catch (error) {
                setCode(`Error loading code from ${filePath}: ${error.message}`);
            }
        };

        fetchCode();
    }, [filePath]);

    return <CodeBlock code={code} {...props} />;
};

FileCodeBlock.propTypes = {
    filePath: PropTypes.string.isRequired,
};

CodeBlock.File = FileCodeBlock;


const MultiExample = ({ examples = [], name = "Code examples", ...props }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                        {name}
                    </Typography>
                </AccordionSummary>
                <Stack direction = "row" spacing = {1} sx = {{width : "100%"}}>
                    {examples.map((example, index) => (

                        <AccordionDetails>
                            <CodeBlock.File
                                filePath={example.filePath}
                                language={example.language}
                                showCopy={true}
                                {...props}
                            />
                        </AccordionDetails>
                    ))}
                </Stack>
            </Accordion>
        </Box>
    );
};

MultiExample.propTypes = {
    examples: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            filePath: PropTypes.string.isRequired,
            language: PropTypes.string,
        })
    ).isRequired,
};

CodeBlock.MultiExample = MultiExample;

export default CodeBlock;

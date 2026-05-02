import React, { useState, useEffect, useRef } from 'react';
import { Download, Video, Image as ImageIcon, Settings, Code, Zap, Palette, Sparkles, Sun, Moon, Trash2, RefreshCcw, Play, Maximize, Circle, Triangle, Type, Braces } from 'lucide-react';

// --- CONFIGURATION & CONSTANTS ---
const THEMES = {
    dracula: { name: 'Dracula', bg: '#282a36', keyword: '#ff79c6', string: '#f1fa8c', function: '#50fa7b', number: '#bd93f9', comment: '#6272a4', default: '#f8f8f2' },
    vscodeDark: { name: 'VS Code Dark', bg: '#1e1e1e', keyword: '#569cd6', string: '#ce9178', function: '#dcdcaa', number: '#b5cea8', comment: '#6a9955', default: '#d4d4d4' },
    githubDark: { name: 'GitHub Dark', bg: '#0d1117', keyword: '#ff7b72', string: '#a5d6ff', function: '#d2a8ff', number: '#79c0ff', comment: '#8b949e', default: '#c9d1d9' },
    githubLight: { name: 'GitHub Light', bg: '#ffffff', keyword: '#d73a49', string: '#032f62', function: '#6f42c1', number: '#005cc5', comment: '#6a737d', default: '#24292e' },
    monokai: { name: 'Monokai', bg: '#272822', keyword: '#f92672', string: '#e6db74', function: '#a6e22e', number: '#ae81ff', comment: '#75715e', default: '#f8f8f2' },
    oneDark: { name: 'One Dark', bg: '#282c34', keyword: '#c678dd', string: '#98c379', function: '#61afef', number: '#d19a66', comment: '#5c6370', default: '#abb2bf' },
    nightOwl: { name: 'Night Owl', bg: '#011627', keyword: '#c792ea', string: '#ecc48d', function: '#82aaff', number: '#f78c6c', comment: '#5c7e8c', default: '#d6deeb' },
    nord: { name: 'Nord', bg: '#2e3440', keyword: '#81a1c1', string: '#a3be8c', function: '#88c0d0', number: '#b48ead', comment: '#4c566a', default: '#d8dee9' },
    synthwave: { name: 'Synthwave', bg: '#2b213a', keyword: '#f92aad', string: '#ff8b39', function: '#36f9f6', number: '#f97e72', comment: '#848bbd', default: '#f92aad' },
    solarizedDark: { name: 'Solarized Dark', bg: '#002b36', keyword: '#859900', string: '#2aa198', function: '#268bd2', number: '#d33682', comment: '#586e75', default: '#839496' },
    tokyoNight: { name: 'Tokyo Night', bg: '#1a1b26', keyword: '#bb9af7', string: '#9ece6a', function: '#7aa2f7', number: '#ff9e64', comment: '#565f89', default: '#a9b1d6' },
    shadesOfPurple: { name: 'Shades of Purple', bg: '#2d2b55', keyword: '#ff9d00', string: '#a5ff90', function: '#fad000', number: '#ff628c', comment: '#b362ff', default: '#ffffff' },
    rosePine: { name: 'Rosé Pine', bg: '#191724', keyword: '#31748f', string: '#f6c177', function: '#ebbcba', number: '#eb6f92', comment: '#6e6a86', default: '#e0def4' },
    poimandres: { name: 'Poimandres', bg: '#1b1e28', keyword: '#add7ff', string: '#5de4c7', function: '#5de4c7', number: '#5de4c7', comment: '#767c9d', default: '#a6accd' },
    cobalt2: { name: 'Cobalt2', bg: '#193549', keyword: '#ff9d00', string: '#3ad900', function: '#ffc600', number: '#ffc600', comment: '#0088ff', default: '#ffffff' },
};

const GRADIENTS = {
    candy: { name: 'Pop Candy', colors: ['#F472B6', '#8B5CF6'] },
    sunrise: { name: 'Optimism', colors: ['#FBBF24', '#F472B6'] },
    mint: { name: 'Fresh Mint', colors: ['#34D399', '#3B82F6'] },
    ocean: { name: 'Deep Ocean', colors: ['#1E293B', '#3B82F6'] },
    monochrome: { name: 'Slate Grid', colors: ['#94A3B8', '#475569'] },
    vaporwave: { name: 'Vaporwave', colors: ['#ff71ce', '#01cdfe', '#05ffa1'] },
    citrus: { name: 'Citrus Splash', colors: ['#fdc830', '#f37335'] },
    cosmic: { name: 'Cosmic Void', colors: ['#0f2027', '#203a43', '#2c5364'] },
    hyper: { name: 'Hyper Pink', colors: ['#ec4899', '#8b5cf6', '#3b82f6'] },
    forest: { name: 'Neon Forest', colors: ['#134e5e', '#71b280'] },
    sunset: { name: 'Sunset Vibe', colors: ['#ff512f', '#dd2476'] },
    breeze: { name: 'Ocean Breeze', colors: ['#2193b0', '#6dd5ed'] },
    purpleRain: { name: 'Purple Rain', colors: ['#cc2b5e', '#753a88'] },
    midnight: { name: 'Midnight City', colors: ['#232526', '#414345'] },
    flare: { name: 'Solar Flare', colors: ['#f12711', '#f5af19'] },
    aurora: { name: 'Aurora Borealis', colors: ['#00c6ff', '#0072ff'] },
    sublime: { name: 'Sublime Light', colors: ['#fc4a1a', '#f7b733'] },
    witching: { name: 'Witching Hour', colors: ['#c31432', '#240b36'] }
};

const LANGUAGES = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    jsx: 'React (JSX)',
    tsx: 'React (TSX)',
    python: 'Python',
    html: 'HTML',
    css: 'CSS',
    cpp: 'C++',
    csharp: 'C#',
    java: 'Java',
    rust: 'Rust',
    go: 'Go',
    swift: 'Swift',
    kotlin: 'Kotlin',
    ruby: 'Ruby',
    php: 'PHP',
    sql: 'SQL',
    bash: 'Bash / Shell',
    json: 'JSON',
    yaml: 'YAML',
    markdown: 'Markdown',
    graphql: 'GraphQL',
    dart: 'Dart',
    lua: 'Lua',
    dockerfile: 'Dockerfile'
};

const FONT_SIZES = [12, 14, 16, 18, 20, 22, 24, 28, 32];

const RESOLUTIONS = {
    '1080p': { name: 'Standard (HD Scale)', is4K: false },
    '4K': { name: 'Ultra (4K Scale)', is4K: true }
};

const DEFAULT_CODE = `import { useState, useEffect } from 'react';

export default function GeometricCraftr() {
  const [status, setStatus] = useState('Idle');

  const generateVideo = async () => {
    setStatus('Rendering 4K...');
    await createTypingAnimation();
    setStatus('Ready!');
  };

  return (
    <button className="btn-candy" onClick={generateVideo}>
      Export 4K Video
    </button>
  );
}`;

// --- UTILITIES ---

const LANG_DEF = {
    javascript: { keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'new', 'this', 'await', 'async', 'try', 'catch', 'switch', 'case', 'break', 'default', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof'], builtins: ['console', 'window', 'document', 'Math', 'Promise', 'Array', 'Object', 'String', 'Number', 'Set', 'Map', 'setTimeout', 'setInterval'], comment: ['//', '/*'] },
    typescript: { keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'new', 'this', 'await', 'async', 'try', 'catch', 'switch', 'case', 'break', 'default', 'true', 'false', 'null', 'undefined', 'interface', 'type', 'enum', 'implements', 'public', 'private', 'protected', 'readonly', 'as', 'any', 'unknown', 'never', 'string', 'number', 'boolean'], builtins: ['console', 'window', 'document', 'Math', 'Promise', 'Array', 'Object', 'String', 'Number', 'Set', 'Map'], comment: ['//', '/*'] },
    python: { keywords: ['def', 'class', 'import', 'from', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'return', 'yield', 'break', 'continue', 'pass', 'and', 'or', 'not', 'is', 'in', 'lambda', 'global', 'nonlocal', 'assert', 'del', 'True', 'False', 'None'], builtins: ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'type', 'super', 'enumerate', 'zip', 'map', 'filter', 'sum', 'min', 'max'], comment: ['#'] },
    java: { keywords: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'finally', 'new', 'this', 'super', 'static', 'final', 'void', 'boolean', 'int', 'double', 'float', 'char', 'byte', 'short', 'long', 'true', 'false', 'null', 'import', 'package', 'throws', 'throw'], builtins: ['System', 'out', 'println', 'print', 'String', 'Math', 'Object', 'Thread', 'Exception', 'ArrayList', 'HashMap', 'List', 'Map'], comment: ['//', '/*'] },
    cpp: { keywords: ['int', 'float', 'double', 'char', 'void', 'bool', 'true', 'false', 'if', 'else', 'for', 'while', 'return', 'class', 'struct', 'public', 'private', 'protected', 'namespace', 'using', 'template', 'typename', 'new', 'delete', 'const', 'static', 'inline', 'virtual', 'include'], builtins: ['std', 'cout', 'cin', 'endl', 'vector', 'string', 'map', 'set', 'printf'], comment: ['//', '/*'] },
    csharp: { keywords: ['public', 'private', 'protected', 'internal', 'class', 'interface', 'struct', 'enum', 'return', 'if', 'else', 'for', 'foreach', 'while', 'do', 'try', 'catch', 'finally', 'new', 'this', 'base', 'static', 'readonly', 'const', 'void', 'bool', 'int', 'double', 'float', 'char', 'string', 'true', 'false', 'null', 'using', 'namespace', 'async', 'await', 'var'], builtins: ['Console', 'WriteLine', 'Write', 'Task', 'Exception', 'Math', 'List', 'Dictionary'], comment: ['//', '/*'] },
    go: { keywords: ['func', 'var', 'const', 'if', 'else', 'for', 'return', 'package', 'import', 'type', 'struct', 'interface', 'map', 'chan', 'go', 'defer', 'true', 'false', 'nil', 'switch', 'case', 'default', 'range'], builtins: ['fmt', 'Println', 'Printf', 'Print', 'make', 'new', 'len', 'cap', 'append', 'close', 'panic', 'recover'], comment: ['//', '/*'] },
    rust: { keywords: ['fn', 'let', 'mut', 'if', 'else', 'for', 'while', 'loop', 'match', 'return', 'struct', 'enum', 'trait', 'impl', 'pub', 'use', 'mod', 'crate', 'as', 'ref', 'move', 'true', 'false', 'Some', 'None', 'Ok', 'Err'], builtins: ['println!', 'print!', 'format!', 'panic!', 'vec!', 'String', 'Vec', 'Result', 'Option', 'i32', 'u32', 'f64', 'bool', 'char'], comment: ['//', '/*'] },
    html: { keywords: ['html', 'head', 'body', 'div', 'span', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'input', 'button', 'script', 'style', 'link', 'meta', 'img', 'nav', 'header', 'footer', 'section', 'article', 'main'], builtins: ['id', 'class', 'src', 'href', 'alt', 'type', 'value', 'name', 'placeholder', 'style', 'rel', 'content'], comment: ['<!--'] },
    css: { keywords: ['display', 'margin', 'padding', 'color', 'background', 'border', 'width', 'height', 'font', 'position', 'top', 'bottom', 'left', 'right', 'flex', 'grid', 'align', 'justify', 'transition', 'transform', 'animation', 'cursor', 'z-index'], builtins: ['px', 'rem', 'em', 'vh', 'vw', '%', 's', 'ms', 'solid', 'relative', 'absolute', 'fixed', 'flex', 'none', 'block', 'inline', 'center', 'hidden', 'visible'], comment: ['/*'] },
    sql: { keywords: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'DESC', 'ASC'], builtins: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'NOW', 'DATE', 'VARCHAR', 'INT', 'BOOLEAN', 'TIMESTAMP'], comment: ['--'] },
    bash: { keywords: ['if', 'then', 'elif', 'else', 'fi', 'for', 'while', 'in', 'do', 'done', 'case', 'esac', 'function', 'return', 'echo', 'read', 'export', 'source', 'alias', 'true', 'false'], builtins: ['grep', 'awk', 'sed', 'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'chmod', 'chown', 'cat', 'tail', 'head', 'tar', 'curl', 'wget'], comment: ['#'] },
    json: { keywords: ['true', 'false', 'null'], builtins: [], comment: [] },
    yaml: { keywords: ['true', 'false', 'null'], builtins: [], comment: ['#'] },
    markdown: { keywords: [], builtins: [], comment: ['<!--'] }
};

// Aliases
LANG_DEF.jsx = LANG_DEF.javascript;
LANG_DEF.tsx = LANG_DEF.typescript;
LANG_DEF.swift = { keywords: ['func', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'struct', 'enum', 'protocol', 'extension', 'import', 'true', 'false', 'nil', 'guard', 'switch', 'case', 'default', 'try', 'catch'], builtins: ['print', 'String', 'Int', 'Double', 'Bool', 'Array', 'Dictionary'], comment: ['//', '/*'] };
LANG_DEF.kotlin = { keywords: ['fun', 'val', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'interface', 'object', 'package', 'import', 'true', 'false', 'null', 'when', 'is', 'in', 'as', 'try', 'catch', 'finally'], builtins: ['println', 'print', 'String', 'Int', 'Boolean', 'List', 'Map', 'Set'], comment: ['//', '/*'] };
LANG_DEF.ruby = { keywords: ['def', 'class', 'module', 'if', 'elsif', 'else', 'end', 'unless', 'for', 'while', 'until', 'return', 'yield', 'require', 'include', 'extend', 'true', 'false', 'nil', 'do', 'rescue', 'ensure'], builtins: ['puts', 'print', 'p', 'String', 'Integer', 'Array', 'Hash', 'Symbol'], comment: ['#'] };
LANG_DEF.php = { keywords: ['function', 'class', 'public', 'private', 'protected', 'if', 'elseif', 'else', 'for', 'foreach', 'while', 'return', 'echo', 'print', 'require', 'include', 'true', 'false', 'null', 'namespace', 'use', 'new', 'try', 'catch', 'finally'], builtins: ['strlen', 'array', 'isset', 'empty', 'str_replace', 'explode', 'implode', 'count'], comment: ['//', '#', '/*'] };
LANG_DEF.graphql = { keywords: ['type', 'query', 'mutation', 'subscription', 'interface', 'union', 'enum', 'input', 'implements'], builtins: ['String', 'Int', 'Float', 'Boolean', 'ID'], comment: ['#'] };
LANG_DEF.dart = { keywords: ['class', 'import', 'as', 'if', 'else', 'for', 'while', 'return', 'true', 'false', 'null', 'void', 'var', 'final', 'const', 'async', 'await', 'yield', 'try', 'catch', 'finally', 'extends', 'implements', 'with'], builtins: ['print', 'String', 'int', 'double', 'bool', 'List', 'Map', 'Set', 'Future', 'Stream'], comment: ['//', '/*'] };
LANG_DEF.lua = { keywords: ['function', 'local', 'if', 'elseif', 'else', 'then', 'end', 'for', 'while', 'repeat', 'until', 'return', 'break', 'and', 'or', 'not', 'true', 'false', 'nil', 'in', 'do'], builtins: ['print', 'math', 'string', 'table', 'require', 'tostring', 'tonumber', 'type', 'pairs', 'ipairs'], comment: ['--', '--[['] };
LANG_DEF.dockerfile = { keywords: ['FROM', 'RUN', 'CMD', 'LABEL', 'EXPOSE', 'ENV', 'ADD', 'COPY', 'ENTRYPOINT', 'VOLUME', 'USER', 'WORKDIR', 'ARG', 'ONBUILD', 'STOPSIGNAL', 'HEALTHCHECK', 'SHELL'], builtins: [], comment: ['#'] };

const GENERIC_LANG = {
    keywords: ['const', 'let', 'var', 'function', 'def', 'class', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'public', 'private', 'true', 'false', 'null', 'undefined'],
    builtins: ['print', 'console', 'log', 'echo'],
    comment: ['//', '#']
};

function tokenize(code, languageId) {
    const def = LANG_DEF[languageId] || GENERIC_LANG;
    const tokens = [];

    let commentPattern = '';
    if (def.comment.includes('//')) commentPattern += '|\\/\\/.*';
    if (def.comment.includes('/*')) commentPattern += '|\\/\\*[\\s\\S]*?\\*\\/';
    if (def.comment.includes('#')) commentPattern += '|#.*';
    if (def.comment.includes('<!--')) commentPattern += '|<!--[\\s\\S]*?-->';
    if (def.comment.includes('--')) commentPattern += '|--.*';
    if (def.comment.includes('--[[')) commentPattern += '|--\\[\\[[\\s\\S]*?\\]\\]';

    const safeComment = commentPattern ? commentPattern.slice(1) + '|' : '';
    const regexStr = `(${safeComment}"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`|\\b\\d+(?:\\.\\d+)?\\b|[a-zA-Z_]\\w*|\\s+|[^\\w\\s])`;
    const regex = new RegExp(regexStr, 'g');

    const keywords = new Set(def.keywords || []);
    const builtins = new Set(def.builtins || []);

    let match;
    while ((match = regex.exec(code)) !== null) {
        const text = match[0];
        let type = 'default';

        if (
            (def.comment.includes('//') && text.startsWith('//')) ||
            (def.comment.includes('/*') && text.startsWith('/*')) ||
            (def.comment.includes('#') && text.startsWith('#')) ||
            (def.comment.includes('<!--') && text.startsWith('<!--')) ||
            (def.comment.includes('--') && text.startsWith('--'))
        ) {
            type = 'comment';
        } else if (text.startsWith('"') || text.startsWith("'") || text.startsWith('`')) {
            type = 'string';
        } else if (/^\d/.test(text)) {
            type = 'number';
        } else if (keywords.has(text)) {
            type = 'keyword';
        } else if (builtins.has(text)) {
            type = 'function';
        }

        tokens.push({ text, type });
    }
    return tokens;
}

const roundRect = (ctx, x, y, width, height, radius) => {
    if (ctx.roundRect) {
        ctx.roundRect(x, y, width, height, radius);
        return;
    }
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
};

const getSupportedMimeType = () => {
    const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
    for (const type of types) {
        if (MediaRecorder.isTypeSupported(type)) return type;
    }
    return '';
};

// --- MAIN COMPONENT ---
export default function App() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [theme, setTheme] = useState('oneDark');
    const [gradient, setGradient] = useState('candy');
    const [language, setLanguage] = useState('javascript');
    const [fontSize, setFontSize] = useState(16);
    const [resolution, setResolution] = useState('1080p');

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

    const previewCanvasRef = useRef(null);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Offscreen canvas reference for massive performance boost during video recording
    const cachedBgRef = useRef(null);

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    // When theme/gradient/settings change, invalidate the cache
    useEffect(() => {
        cachedBgRef.current = null;
    }, [theme, gradient, language, fontSize, isDarkMode, resolution, code.split('\n').length]);

    // --- SUPER OPTIMIZED RENDERING ENGINE ---
    const drawFrame = (canvas, currentText, fullCode, is4KMode, currentTheme, currentGradient, currentLanguage, currentFontSize, useCache = false) => {
        const ctx = canvas.getContext('2d', { alpha: false });

        // 1. Scale
        const scale = is4KMode ? 4 : 2;

        // 2. Compute Layout & Sizing based on the full text
        const rawFontSize = currentFontSize * scale;
        const padding = 48 * scale;
        const headerHeight = 40 * scale;
        const rawLineHeight = rawFontSize * 1.5;
        const bgPadding = 120 * scale;

        ctx.font = `${rawFontSize}px Consolas, Monaco, "Courier New", monospace`;
        ctx.textBaseline = 'top';

        const fullLines = fullCode.split('\n');

        // Quick measurement to find max width without regex tokenizing everything
        let longestLine = "";
        fullLines.forEach(line => {
            if (line.length > longestLine.length) longestLine = line;
        });
        const rawMaxWidth = ctx.measureText(longestLine).width;
        const lineNumberWidth = ctx.measureText(String(fullLines.length)).width + (32 * scale);

        const rawWindowWidth = Math.max(600 * scale, rawMaxWidth + padding * 2 + lineNumberWidth);
        const rawWindowHeight = fullLines.length * rawLineHeight + padding * 2 + headerHeight;

        canvas.width = rawWindowWidth + (bgPadding * 2);
        canvas.height = rawWindowHeight + (bgPadding * 2);

        // ========================================================
        // CACHING LOGIC: ONLY DRAW HEAVY SHADOWS & BACKGROUNDS ONCE
        // ========================================================
        if (useCache) {
            if (!cachedBgRef.current || cachedBgRef.current.width !== canvas.width || cachedBgRef.current.height !== canvas.height) {
                // Build the cache!
                const offscreen = document.createElement('canvas');
                offscreen.width = canvas.width;
                offscreen.height = canvas.height;
                const oCtx = offscreen.getContext('2d', { alpha: false });

                // Background Gradient
                const activeGradient = GRADIENTS[currentGradient].colors;
                const grad = oCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
                activeGradient.forEach((color, i) => {
                    grad.addColorStop(i / (Math.max(1, activeGradient.length - 1)), color);
                });
                oCtx.fillStyle = grad;
                oCtx.fillRect(0, 0, canvas.width, canvas.height);

                oCtx.save();
                oCtx.translate(bgPadding, bgPadding);

                // HEAVY SHADOW - Rendered ONCE
                oCtx.shadowColor = 'rgba(15, 23, 42, 0.4)';
                oCtx.shadowBlur = 40 * scale;
                oCtx.shadowOffsetY = 20 * scale;

                // Window Background
                oCtx.fillStyle = THEMES[currentTheme].bg;
                oCtx.beginPath();
                roundRect(oCtx, 0, 0, rawWindowWidth, rawWindowHeight, 16 * scale);
                oCtx.fill();

                oCtx.shadowColor = 'transparent';

                // Window Controls (Traffic Lights)
                const dotY = 36 * scale;
                const dotRadius = 7 * scale;
                ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, i) => {
                    oCtx.fillStyle = color;
                    oCtx.beginPath();
                    oCtx.arc(padding + (i * 24 * scale), dotY, dotRadius, 0, Math.PI * 2);
                    oCtx.fill();
                });

                // Language Badge
                oCtx.font = `bold ${14 * scale}px "Plus Jakarta Sans", sans-serif`;
                const langText = LANGUAGES[currentLanguage] || currentLanguage;
                const langWidth = oCtx.measureText(langText).width;

                oCtx.fillStyle = THEMES[currentTheme].default + '15';
                oCtx.beginPath();
                const badgeHeight = 26 * scale;
                const badgeY = dotY - (badgeHeight / 2);
                roundRect(oCtx, rawWindowWidth - padding - langWidth - (24 * scale), badgeY, langWidth + (24 * scale), badgeHeight, 6 * scale);
                oCtx.fill();

                oCtx.fillStyle = THEMES[currentTheme].default + '80';
                oCtx.textBaseline = 'middle';
                oCtx.fillText(langText, rawWindowWidth - padding - langWidth - (12 * scale), dotY + (1 * scale));

                oCtx.restore();
                cachedBgRef.current = offscreen;
            }

            // PASTE THE CACHED BACKGROUND IN 1 MICROSECOND!
            ctx.drawImage(cachedBgRef.current, 0, 0);
        } else {
            // Non-cached version (for live preview or single image export)
            const activeGradient = GRADIENTS[currentGradient].colors;
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            activeGradient.forEach((color, i) => {
                grad.addColorStop(i / (Math.max(1, activeGradient.length - 1)), color);
            });
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(bgPadding, bgPadding);

            ctx.shadowColor = 'rgba(15, 23, 42, 0.4)';
            ctx.shadowBlur = 40 * scale;
            ctx.shadowOffsetY = 20 * scale;

            ctx.fillStyle = THEMES[currentTheme].bg;
            ctx.beginPath();
            roundRect(ctx, 0, 0, rawWindowWidth, rawWindowHeight, 16 * scale);
            ctx.fill();

            ctx.shadowColor = 'transparent';

            const dotY = 36 * scale;
            const dotRadius = 7 * scale;
            ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((color, i) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(padding + (i * 24 * scale), dotY, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.font = `bold ${14 * scale}px "Plus Jakarta Sans", sans-serif`;
            const langText = LANGUAGES[currentLanguage] || currentLanguage;
            const langWidth = ctx.measureText(langText).width;

            ctx.fillStyle = THEMES[currentTheme].default + '15';
            ctx.beginPath();
            const badgeHeight = 26 * scale;
            const badgeY = dotY - (badgeHeight / 2);
            roundRect(ctx, rawWindowWidth - padding - langWidth - (24 * scale), badgeY, langWidth + (24 * scale), badgeHeight, 6 * scale);
            ctx.fill();

            ctx.fillStyle = THEMES[currentTheme].default + '80';
            ctx.textBaseline = 'middle';
            ctx.fillText(langText, rawWindowWidth - padding - langWidth - (12 * scale), dotY + (1 * scale));
            ctx.textBaseline = 'top';
            ctx.restore();
        }

        // ========================================================
        // DRAW ONLY THE NEW TEXT OVER THE STATIC BACKGROUND
        // ========================================================
        ctx.save();
        ctx.translate(bgPadding, bgPadding);

        ctx.font = `${rawFontSize}px Consolas, Monaco, "Courier New", monospace`;
        ctx.textBaseline = 'top';
        let currentY = padding + headerHeight;
        const activeTheme = THEMES[currentTheme];

        const lines = currentText.split('\n');

        lines.forEach((line, index) => {
            // Draw Line Number
            ctx.fillStyle = activeTheme.comment || (activeTheme.default + '80');
            ctx.globalAlpha = 0.5;
            const lineNumStr = String(index + 1);
            const numWidth = ctx.measureText(lineNumStr).width;

            const lineNumX = padding + lineNumberWidth - (16 * scale) - numWidth;
            ctx.fillText(lineNumStr, lineNumX, currentY);

            ctx.globalAlpha = 1.0;

            // Draw Code
            let currentX = padding + lineNumberWidth;
            const tokens = tokenize(line, currentLanguage);
            tokens.forEach(token => {
                ctx.fillStyle = activeTheme[token.type] || activeTheme.default;
                ctx.fillText(token.text, currentX, currentY);
                currentX += ctx.measureText(token.text).width;
            });
            currentY += rawLineHeight;
        });

        ctx.restore();
    };

    // --- EXPORT LOGIC ---
    const exportImage = () => {
        const is4K = RESOLUTIONS[resolution].is4K;
        const canvas = document.createElement('canvas');
        drawFrame(canvas, code, code, is4K, theme, gradient, language, fontSize, false);

        const a = document.createElement('a');
        a.download = `CodeCraftr-${is4K ? '4K' : '1080p'}.png`;
        a.href = canvas.toDataURL('image/png', 1.0);
        a.click();
    };

    const exportVideo = () => {
        if (isRecording) return;
        setIsRecording(true);
        setProgress(0);
        setVideoPreviewUrl(null);
        cachedBgRef.current = null; // Clear cache before export

        const is4K = RESOLUTIONS[resolution].is4K;
        const canvas = document.createElement('canvas');
        const mimeType = getSupportedMimeType();

        // Smooth 60 FPS Video Stream
        const canvasStream = canvas.captureStream(60);

        // Stabilized Bitrate
        const bitrate = is4K ? 10000000 : 5000000;
        const recorder = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: bitrate });

        const chunks = [];
        recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType || 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoPreviewUrl(url);
            setIsRecording(false);
            setProgress(100);
            cachedBgRef.current = null; // Clean up memory
            setTimeout(() => setProgress(0), 1000);
        };

        recorder.start();

        // Human-like, beginner typing duration
        const typingDurationMs = Math.max(8000, code.length * 150);
        const pauseDurationMs = 5000;
        const totalDurationMs = typingDurationMs + pauseDurationMs;

        const charTimestamps = [];
        let totalWeight = 0;
        const weights = [];

        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            let weight = 100 + Math.random() * 150;
            if (char === ' ') weight += 50 + Math.random() * 50;
            else if (char === '\n') weight += 500 + Math.random() * 500;
            else if (/[;{}(),.=]/.test(char)) weight += 300 + Math.random() * 300;
            if (Math.random() < 0.05) weight += 800 + Math.random() * 1000;
            weights.push(weight);
            totalWeight += weight;
        }

        let accumulatedTime = 0;
        for (let i = 0; i < code.length; i++) {
            accumulatedTime += (weights[i] / totalWeight) * typingDurationMs;
            charTimestamps.push(accumulatedTime);
        }

        let startTime = null;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            const isTyping = elapsed <= typingDurationMs;
            const showCursor = isTyping || Math.floor((elapsed - typingDurationMs) / 500) % 2 === 0;
            const cursor = showCursor ? '█' : '';

            if (isTyping) {
                let charCount = 0;
                while (charCount < code.length && charTimestamps[charCount] <= elapsed) {
                    charCount++;
                }

                const currentText = code.substring(0, charCount) + cursor;
                // PASS useCache = true to completely unlock CPU performance!
                drawFrame(canvas, currentText, code, is4K, theme, gradient, language, fontSize, true);
                setProgress(Math.min(100, Math.round((charCount / code.length) * 100)));
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed <= totalDurationMs) {
                const currentText = code + cursor;
                drawFrame(canvas, currentText, code, is4K, theme, gradient, language, fontSize, true);
                setProgress(100);
                animationFrameId = requestAnimationFrame(animate);
            } else {
                drawFrame(canvas, code, code, is4K, theme, gradient, language, fontSize, true);
                setTimeout(() => recorder.stop(), 50);
                cancelAnimationFrame(animationFrameId);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
    };

    const handleDownloadPreview = () => {
        const is4K = RESOLUTIONS[resolution].is4K;
        const a = document.createElement('a');
        a.href = videoPreviewUrl;
        a.download = `CodeCraftr-Animation-${is4K ? '4K' : '1080p'}.webm`;
        a.click();
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) videoRef.current.play();
        else videoRef.current.pause();
    };

    const toggleFullscreen = (e) => {
        e.stopPropagation();
        if (!videoContainerRef.current) return;
        if (!document.fullscreenElement) {
            videoContainerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Initial preview render (No cache needed, runs once)
    useEffect(() => {
        if (previewCanvasRef.current && !isRecording && !videoPreviewUrl) {
            drawFrame(previewCanvasRef.current, code, code, false, theme, gradient, language, fontSize, false);
        }
    }, [code, theme, gradient, language, fontSize, isRecording, videoPreviewUrl]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A] text-[#F8FAFC] pattern-dark' : 'bg-[#FFFDF5] text-[#1E293B] pattern-light'} font-jakarta selection:bg-[#8B5CF6]/30 overflow-x-hidden relative`}>

            {/* GLOBAL CSS INJECTION FOR PLAYFUL GEOMETRIC SYSTEM */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .pattern-light {
          background-image: radial-gradient(#CBD5E1 2px, transparent 2px);
          background-size: 28px 28px;
        }
        .pattern-dark {
          background-image: radial-gradient(#1E293B 2px, transparent 2px);
          background-size: 28px 28px;
        }
        
        /* The Pop Shadow */
        .shadow-pop { box-shadow: 6px 6px 0px 0px ${isDarkMode ? '#020617' : '#1E293B'}; }
        .shadow-pop-lg { box-shadow: 10px 10px 0px 0px ${isDarkMode ? '#020617' : '#1E293B'}; }
        .shadow-pop-sm { box-shadow: 4px 4px 0px 0px ${isDarkMode ? '#020617' : '#1E293B'}; }
        
        /* Interactive Bounce */
        .btn-bounce { transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .btn-bounce:hover { 
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0px 0px ${isDarkMode ? '#020617' : '#1E293B'}; 
        }
        .btn-bounce:active { 
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px 0px ${isDarkMode ? '#020617' : '#1E293B'}; 
        }

        /* Specific Component Classes */
        .btn-candy {
          background-color: #8B5CF6;
          color: white;
          border: 2px solid ${isDarkMode ? '#020617' : '#1E293B'};
          border-radius: 9999px;
        }

        .card-sticker {
          background-color: ${isDarkMode ? '#1E293B' : '#FFFFFF'};
          border: 2px solid ${isDarkMode ? '#020617' : '#1E293B'};
          border-radius: 16px;
        }

        .input-chunky {
          background-color: ${isDarkMode ? '#334155' : '#FFFFFF'};
          border: 2px solid ${isDarkMode ? '#020617' : '#CBD5E1'};
          border-radius: 12px;
          color: ${isDarkMode ? '#F8FAFC' : '#1E293B'};
        }
        .input-chunky:focus {
          border-color: #8B5CF6;
          outline: none;
          box-shadow: 4px 4px 0px 0px #8B5CF6;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDarkMode ? '#475569' : '#94A3B8'}; 
          border-radius: 999px;
          border: 3px solid ${isDarkMode ? '#1E293B' : '#FFFFFF'};
        }
      `}} />

            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-10 text-[#FBBF24] opacity-80 hidden lg:block -z-0 pointer-events-none animate-pulse">
                <Circle className="w-16 h-16 fill-current stroke-none" />
            </div>
            <div className="absolute bottom-20 right-10 text-[#F472B6] opacity-80 hidden lg:block -z-0 pointer-events-none rotate-12">
                <Triangle className="w-20 h-20 fill-current stroke-none" />
            </div>

            {/* HEADER */}
            <header className="pt-10 pb-6 px-6 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
                <div
                    className="flex items-center gap-4 group cursor-pointer"
                    onClick={() => window.location.reload()}
                    title="Reset Workspace"
                >
                    <div className={`w-14 h-14 flex items-center justify-center border-[3px] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none shadow-pop btn-bounce ${isDarkMode ? 'bg-[#334155] border-[#020617]' : 'bg-white border-[#1E293B]'}`}>
                        <Code className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-outfit tracking-tight">
                            CodeCrafter
                            <span className="inline-block ml-3 w-3 h-3 rounded-full bg-[#34D399] animate-bounce"></span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-14 h-14 flex items-center justify-center border-2 rounded-full shadow-pop btn-bounce ${isDarkMode ? 'bg-[#1E293B] border-[#020617]' : 'bg-white border-[#1E293B]'}`}
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <Sun className="w-6 h-6 stroke-[2.5] text-[#FBBF24]" /> : <Moon className="w-6 h-6 stroke-[2.5] text-[#8B5CF6]" />}
                    </button>
                </div>
            </header>

            {/* MAIN LAYOUT */}
            <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 xl:grid-cols-12 gap-10">

                {/* LEFT PANEL: CONFIGURATION */}
                <div className="xl:col-span-5 space-y-8 relative z-10">

                    {/* Code Editor (Sticker Card) */}
                    <div className="card-sticker shadow-pop-lg p-6 relative">
                        <div className="absolute -top-4 -right-4 bg-[#FBBF24] border-2 border-[#1E293B] rounded-full px-4 py-1 text-sm font-bold font-outfit transform rotate-6 shadow-pop-sm">
                            User-Edit!
                        </div>

                        <label className="text-lg font-bold font-outfit uppercase tracking-wide mb-3 flex items-center gap-2">
                            <span className="bg-[#8B5CF6] p-1.5 rounded-md text-white"><Code className="w-4 h-4 stroke-[3]" /></span>
                            CodePad
                        </label>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-56 p-4 text-base font-mono input-chunky transition-all custom-scrollbar resize-none"
                            spellCheck="false"
                        />
                    </div>

                    {/* Settings Panel */}
                    <div className="card-sticker shadow-pop-lg p-6 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                            <div className="space-y-2">
                                <label className="text-sm font-bold font-outfit uppercase tracking-wide text-[#64748B] flex items-center gap-2">
                                    <Palette className="w-4 h-4 stroke-[2.5]" /> Theme
                                </label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full p-3 text-base input-chunky transition-all appearance-none cursor-pointer font-semibold"
                                >
                                    {Object.entries(THEMES).map(([k, v]) => (
                                        <option key={k} value={k}>{v.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold font-outfit uppercase tracking-wide text-[#64748B] flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 stroke-[2.5]" /> Background
                                </label>
                                <select
                                    value={gradient}
                                    onChange={(e) => setGradient(e.target.value)}
                                    className="w-full p-3 text-base input-chunky transition-all appearance-none cursor-pointer font-semibold"
                                >
                                    {Object.entries(GRADIENTS).map(([k, v]) => (
                                        <option key={k} value={k}>{v.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold font-outfit uppercase tracking-wide text-[#64748B] flex items-center gap-2">
                                    <Braces className="w-4 h-4 stroke-[2.5]" /> Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-3 text-base input-chunky transition-all appearance-none cursor-pointer font-semibold"
                                >
                                    {Object.entries(LANGUAGES).map(([k, v]) => (
                                        <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold font-outfit uppercase tracking-wide text-[#64748B] flex items-center gap-2">
                                    <Type className="w-4 h-4 stroke-[2.5]" /> Font Size
                                </label>
                                <select
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full p-3 text-base input-chunky transition-all appearance-none cursor-pointer font-semibold"
                                >
                                    {FONT_SIZES.map((size) => (
                                        <option key={size} value={size}>{size}px</option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="space-y-3 pt-6 border-t-2 border-dashed border-[#CBD5E1] dark:border-[#334155]">
                            <label className="text-sm font-bold font-outfit uppercase tracking-wide text-[#64748B] flex items-center gap-2">
                                <Settings className="w-4 h-4 stroke-[2.5]" /> Output Quality
                            </label>
                            <div className="flex gap-4">
                                {Object.entries(RESOLUTIONS).map(([k, v]) => (
                                    <button
                                        key={k}
                                        onClick={() => setResolution(k)}
                                        className={`flex-1 text-base py-2.5 rounded-xl border-2 btn-bounce font-bold transition-colors
                      ${resolution === k
                                                ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-pop-sm dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:border-[#F8FAFC]'
                                                : 'bg-transparent border-[#CBD5E1] text-[#64748B] hover:border-[#1E293B] hover:text-[#1E293B] dark:border-[#334155] dark:hover:border-[#F8FAFC] dark:hover:text-[#F8FAFC]'
                                            }`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <button
                                onClick={exportImage}
                                disabled={isRecording}
                                className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2 border-[#1E293B] dark:border-[#020617] bg-white dark:bg-[#1E293B] font-bold text-lg shadow-pop btn-bounce disabled:opacity-50"
                            >
                                <ImageIcon className="w-5 h-5 stroke-[2.5]" /> Download Image
                            </button>

                            <button
                                onClick={exportVideo}
                                disabled={isRecording}
                                className="w-full flex items-center justify-center gap-3 py-4 btn-candy font-bold text-lg shadow-pop btn-bounce overflow-hidden relative group disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {isRecording ? (
                                    <span className="relative z-10 flex items-center gap-2">
                                        <RefreshCcw className="w-5 h-5 stroke-[3] animate-spin" /> Rendering Magic...
                                    </span>
                                ) : (
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Video className="w-5 h-5 stroke-[3] group-hover:scale-110 transition-transform" /> Create Video
                                    </span>
                                )}
                                {isRecording && (
                                    <div
                                        className="absolute left-0 top-0 bottom-0 bg-white/20 border-r-2 border-white/50"
                                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: LIVE PREVIEW & VIDEO PLAYER */}
                <div className="xl:col-span-7 flex flex-col items-center justify-center relative min-h-[500px] xl:mt-0 mt-8">

                    <div className="w-full relative aspect-video p-1.5 rounded-2xl border-2 border-[#1E293B] dark:border-[#020617] bg-white dark:bg-[#1E293B] shadow-pop-lg z-10 overflow-hidden">

                        <canvas
                            ref={previewCanvasRef}
                            className={`w-full h-full rounded-xl object-contain bg-[#1E293B] ${videoPreviewUrl ? 'hidden' : 'block'}`}
                        />

                        {isRecording && (
                            <div className="absolute inset-0 m-1.5 rounded-xl flex flex-col items-center justify-center z-20 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm">
                                <div className="w-24 h-24 rounded-full border-2 border-[#1E293B] bg-[#F472B6] flex items-center justify-center mb-6 shadow-pop">
                                    <Zap className="w-12 h-12 stroke-[2.5] text-white animate-bounce" />
                                </div>
                                <h3 className="text-3xl font-extrabold font-outfit mb-2">Printing Frames</h3>
                                <p className="text-lg font-semibold text-[#64748B] mb-8">Creating smooth cinematic masterpiece</p>

                                <div className="w-2/3 h-6 rounded-full border-2 border-[#1E293B] bg-[#F1F5F9] dark:bg-[#1E293B] dark:border-[#020617] p-1 shadow-inner">
                                    <div
                                        className="h-full rounded-full bg-[#34D399]"
                                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                                    />
                                </div>
                                <p className="text-xl font-bold font-outfit mt-4 text-[#8B5CF6]">{progress}%</p>
                            </div>
                        )}

                        {videoPreviewUrl && (
                            <div ref={videoContainerRef} className="absolute inset-0 z-30 flex flex-col bg-black rounded-xl overflow-hidden group">
                                <video
                                    ref={videoRef}
                                    src={videoPreviewUrl}
                                    loop
                                    onClick={togglePlay}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    className="w-full h-full object-contain cursor-pointer"
                                />

                                {!isPlaying && (
                                    <button
                                        onClick={togglePlay}
                                        className="absolute inset-0 m-auto w-24 h-24 rounded-full flex items-center justify-center border-2 border-[#1E293B] bg-[#FBBF24] text-[#1E293B] shadow-pop transition-transform hover:scale-110 z-40"
                                    >
                                        <Play className="w-10 h-10 ml-2 stroke-[3]" fill="currentColor" />
                                    </button>
                                )}

                                <div className="absolute bottom-6 right-6 flex items-center gap-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={toggleFullscreen}
                                        className="p-3 rounded-full border-2 border-[#1E293B] bg-white text-[#1E293B] shadow-pop btn-bounce"
                                    >
                                        <Maximize className="w-5 h-5 stroke-[3]" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoPreviewUrl && (
                        <div className="absolute -bottom-20 w-full flex justify-center gap-6 z-40 animate-in slide-in-from-top-8">
                            <button
                                onClick={handleDownloadPreview}
                                className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#1E293B] bg-[#34D399] text-[#1E293B] font-bold text-lg shadow-pop btn-bounce"
                            >
                                <Download className="w-6 h-6 stroke-[3]" /> Save Video
                            </button>
                            <button
                                onClick={() => setVideoPreviewUrl(null)}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1E293B] bg-white text-[#1E293B] font-bold text-lg shadow-pop btn-bounce"
                            >
                                <Trash2 className="w-5 h-5 stroke-[3]" /> Discard
                            </button>
                        </div>
                    )}

                </div>
            </main>

        </div>
    );
}
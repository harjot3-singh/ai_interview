const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const allFiles = new Set();
walkDir('src', filePath => {
    allFiles.add(filePath.replace(/\\/g, '/'));
});

let hasError = false;

walkDir('src', filePath => {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
            // resolve relative path
            const dir = path.dirname(filePath);
            const resolvedPath = path.resolve(dir, importPath).replace(/\\/g, '/');
            // make it relative to frontend
            const relativeToFrontend = path.relative(process.cwd(), resolvedPath).replace(/\\/g, '/');
            
            // Try to find the file
            let found = false;
            const extensions = ['', '.js', '.jsx', '.css', '.scss'];
            
            for (const ext of extensions) {
                if (allFiles.has(relativeToFrontend + ext)) {
                    found = true;
                    // check exact casing
                    break;
                }
            }
            if (!found) {
                console.error(`MISSING IMPORT: '${importPath}' in file ${filePath}`);
                hasError = true;
            }
        }
    }
});

if (!hasError) {
    console.log("ALL IMPORTS MATCH EXACT CASING AND FILES EXIST.");
}

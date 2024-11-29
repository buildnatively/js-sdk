const fs = require('fs');
const path = require('path');

const isDirectory = (dir) =>
    fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();

const readDirectory = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        if (isDirectory(filePath)) {
            console.log('Found directory:', filePath)
            readDirectory(filePath);
            return;
        }

        if (file.endsWith('.js')) {
            console.log('Replacing file:', file);
            let content = fs.readFileSync(filePath, 'utf-8');
            content = content.replace(
                /(import .*?from\s+['"])([^'"]+)(['"])/g,
                (match, p1, p2, p3) => `${p1}${p2}.js${p3}`
            );
            content = content.replace(
                /(export .*?from\s+['"])([^'"]+)(['"])/g,
                (match, p1, p2, p3) => `${p1}${p2}.js${p3}`
            );
            fs.writeFileSync(filePath, content, 'utf-8');
        }
    });
}

const distDir = path.resolve(__dirname, 'dist');
readDirectory(distDir);

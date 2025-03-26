import fs from "fs";
import path from "path";
import { compileFromFile } from "json-schema-to-typescript";

// Schema input and interface output directories
const schemaDir = "public/schema";
const outputDir = "src/interfaces";

// Function to process all JSON schemas
const processSchemas = async () => {
    try {
        const files = fs.readdirSync(schemaDir).filter(file => file.endsWith(".json"));
        for (const file of files) {
            const inputPath = path.join(schemaDir, file);
            const outputPath = path.join(outputDir, `${path.basename(file, ".json")}.interface.ts`);
            console.log(`Processing ${file}...`);
            const ts = await compileFromFile(inputPath);
            fs.writeFileSync(outputPath, ts);
            console.log(`Generated: ${outputPath}`);
        }
        console.log("All schema files processed successfully!");
    } catch (error) {
        console.error("Error processing schemas:", error);
        process.exit(1);
    }
};

processSchemas();
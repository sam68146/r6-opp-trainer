"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dataPath = path.join(__dirname, "..", "data", "operators.js");
const source = `${fs.readFileSync(dataPath, "utf8")}\n;globalThis.__operators = operators;`;
const context = {};
vm.createContext(context);
vm.runInContext(source, context);

const operators = context.__operators;
const issues = [];
const names = new Set();

if (!Array.isArray(operators)) {
    throw new Error("operators.js did not create an operators array.");
}

operators.forEach((operator, index) => {
    const label = operator?.name || `Entry ${index + 1}`;
    if (!operator?.name) issues.push(`${label}: missing name`);
    if (!["Attack", "Defense"].includes(operator?.side)) issues.push(`${label}: invalid side`);
    if (!Array.isArray(operator?.gadgets)) issues.push(`${label}: gadgets is not an array`);
    if (!Array.isArray(operator?.secondaryWeapons)) issues.push(`${label}: secondaryWeapons is not an array`);
    if (!Array.isArray(operator?.primaryWeapons)) issues.push(`${label}: primaryWeapons is not an array`);
    if (!operator?.uniqueAbility) issues.push(`${label}: missing uniqueAbility`);

    const key = String(operator?.name || "").toLowerCase();
    if (names.has(key)) issues.push(`${label}: duplicate name`);
    names.add(key);
});

console.log(`Operators: ${operators.length}`);
console.log(`Attackers: ${operators.filter(operator => operator.side === "Attack").length}`);
console.log(`Defenders: ${operators.filter(operator => operator.side === "Defense").length}`);

if (issues.length > 0) {
    console.error(`\nFound ${issues.length} issue(s):`);
    issues.forEach(issue => console.error(`- ${issue}`));
    process.exitCode = 1;
} else {
    console.log("Database validation passed.");
}

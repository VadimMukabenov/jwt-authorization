/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ["<rootDir>/node_modules/jest-extended/types/index.d.ts"],
    setupFilesAfterEnv: ["<rootDir>/node_modules/jest-extended/all"]
};

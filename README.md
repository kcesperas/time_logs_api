# Aja-Pos

## Installing dependencies for deployment
`npm run install_prod`

<hr />

## Sequelize

### Setup Sequelize Cli
`npm install sequelize-cli -g`


example: `npm install sequelize-cli -g`

## Migration

### Creating Migration and Model File
`sequelize model:create --name <Name of Model> --attributes note:string`

example: `sequelize model:create --name user --attributes note:string`

### Running Migration
`npm run migration`
### Undoing Migration
`npm run undo_migration`

<hr />

## Seeder
### Creating Seeder File
`npm run create_seeder -- <sequelize arguments>`

example: `npm run create_seeder -- --name create-sample-table`

### Running Seeder
`npm run seeder`
### Undoing Seeder
`npm run undo_seeder`
# Aja-Pos

## Installing dependencies for deployment
`npm run install_prod`

<hr />

## Migration
### Creating Migration File
`npm run create_migration -- --name <sequelize arguments>`

example: `npm run create_migration -- --name create-sample-table`

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
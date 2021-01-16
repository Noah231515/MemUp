#!bin/sh
rm ./MemUp.db
dotnet ef database update --context MemUpDbContext
dotnet ef database update --context MemUpIdentityDbContext
# Seed script needs to be updated 
# sqlite3 MemUp.db < SeedDatabase.sql
echo "New database generated"
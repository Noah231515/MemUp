#!bin/sh
rm ./MemUp.db
dotnet ef database update --context MemUpIdentityDbContext
dotnet ef database update --context MemUpDbContext
sqlite3 MemUp.db < SeedDatabase.sql
echo "New database generated"

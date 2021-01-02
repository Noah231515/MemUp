#!bin/sh
rm ./MemUp.db
dotnet ef database update --context MemUpDbContext
dotnet ef database update --context MemUpIdentityDbContext
echo "New database generated"
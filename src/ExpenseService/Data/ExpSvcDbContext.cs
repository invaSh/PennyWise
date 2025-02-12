﻿using Microsoft.EntityFrameworkCore;
using ExpenseService.Models;

namespace ExpenseService.Data
{
    public class ExpSvcDbContext  : DbContext
    {
        public ExpSvcDbContext(DbContextOptions options) : base(options) { }    

        public DbSet<Expense>  Expenses { get; set; }
        public DbSet<Income>  Incomes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Income>().ToTable("Incomes");
        }
    }
}

﻿using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DTOs
{
    public class GoalDto
    {
        public string Name { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
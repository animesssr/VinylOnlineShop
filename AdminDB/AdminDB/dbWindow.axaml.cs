using AdminDB.mydb;
using Avalonia.Controls;
using System.Collections.Generic;
using System.Linq;

namespace AdminDB
{
    public partial class dbWindow : Window
    {
        public IEnumerable<Vinyl> vinylList { get; set; }
        public dbWindow()
        {
            using (var context = new MydbContext())
            {
                vinylList = context.Vinyls.ToList();

                Vinyl newVinyl = new Vinyl();


            }
            InitializeComponent();
        }
    }
}

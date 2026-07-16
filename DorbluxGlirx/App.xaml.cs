using System;
using System.Threading.Tasks;
using System.Windows;
using DorbluxGlirx.Core;
using DorbluxGlirx.Core.Services;
using DorbluxGlirx.View.MainWindow;
using MessageBox = System.Windows.Forms.MessageBox;

namespace DorbluxGlirx
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            LocalizationManager.Initialize();
            this.MainWindow.Show();
        }

        public new static void Shutdown()
        {
            Current.Dispatcher.Invoke(() => Current.Shutdown());
        }
    }
}
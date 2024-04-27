using Avalonia.Controls;
using Avalonia.Interactivity;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using AdminDB.mydb;
using System.Linq;

namespace AdminDB.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    public async void login_btn_Click(object sender, RoutedEventArgs e)
    {
        var email = login_tb.Text;
        var pass = pass_tb.Text;

        var param = new Dictionary<string, string>
        {
            { "login", email },
            { "password", pass }
        };
        var client = new HttpClient();

        var req = new HttpRequestMessage(
            HttpMethod.Post,
            "https://localhost:7179/login")
        {
            Content = new FormUrlEncodedContent(param)
        };

        var response = await client.SendAsync(req);

        if (response.StatusCode == HttpStatusCode.OK)
        {
            Globals.createToken(email, pass);
            var dbOpen = new dbWindow();
            dbOpen.Show();
            Close();
        }
        //else
        //{
        //    error_lbl.Visibility = Visibility.Visible;
        //}
        /*
            в else можно написать логику для неуспешной авторизации,
            например, показать окно
        */

    }
}

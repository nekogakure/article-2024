// The Infinity's Infinity Style Static Site Generator
Using System.Text.Json
Console.WriteLine("-------Infinity Style Static Site Generator-------");

InfinityStyle.ReadSettingData();

public static class InfinityStyle
{
    private struct htmlTemp
    {
        private htmlTemp(string head, string foot)
        {
            head = "";
            foot = "";
        }
    }

    public static void ReadSettingData()
    {
        StreamReader settingJsonFile = new StreamReader("./test.json");
        //jsonファイルを読み込む機能を搭載せよ
    }
}

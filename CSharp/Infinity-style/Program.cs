// The Infinity's Infinity Style Static Site Generator
using System.Text.Json;

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

    private class SettingData
    {
        public Dictionary<string, customDateSetting>? customDate { get; set; }

        public string? repositoryName { get; set; }
    }

    public class customDateSetting
    {
        public bool auto { get; set; }
        public int year { get; set; }
        public int month { get; set; }
    }

    public static void ReadSettingData()
    {
        // 続きはここを見てやろう。
        // https://learn.microsoft.com/ja-jp/dotnet/standard/serialization/system-text-json/deserialization
        StreamReader settingJsonFile = new StreamReader("./test.json");
        string settingJsonText = settingJsonFile.ReadToEnd();
        Console.WriteLine("Read setting.json:\n\"\"\"\n" + settingJsonText + "\n\"\"\"");
        var options = new JsonSerializerOptions
        {
            ReadCommentHandling = JsonCommentHandling.Skip,
            AllowTrailingCommas = true,
        };
        SettingData? settingData = JsonSerializer.Deserialize<SettingData>(
            settingJsonText,
            options
        );
        Console.WriteLine(settingData?.repositoryName);
    }
}

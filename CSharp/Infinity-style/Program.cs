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

  public static void ReadSettingData()
  {
    StreamReader settingJsonFile = new StreamReader("./test.json");
    string settingJsonText = settingJsonFile.ReadToEnd();
    Console.WriteLine("Read setting.json:\n\"\"\""+settingJsonText+"\n\"\"\"");
  }
}

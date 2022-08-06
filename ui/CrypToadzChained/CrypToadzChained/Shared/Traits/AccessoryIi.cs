using System.ComponentModel;

namespace CrypToadzChained.Shared.Traits;

[Description("Accessory II")]
public enum AccessoryIi : byte
{
    [Description("None")]
    None,
    [Description("Long Cigarette")]
    LongCigarette = 104,
    [Description("Short Cigarette")]
    ShortCigarette = 105,
    [Description("Blush")]
    Blush = 106,
    [Description("Chocolate")]
    Chocolate = 107,
    [Description("Earring")]
    Earring = 108,
    [Description("Shackles")]
    Shackles = 109,
    [Description("Watch")]
    Watch = 110,
    [Description("Just for the Looks")]
    JustForTheLooks = 111
}
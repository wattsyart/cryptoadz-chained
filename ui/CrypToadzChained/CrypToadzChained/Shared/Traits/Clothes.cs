using System.ComponentModel;

namespace CrypToadzChained.Shared.Traits;

public enum Clothes : byte
{
    [Description("None")]
    None = 0,
    [Description("Grey Hoodie")]
    GreyHoodie = 246,
    [Description("Slime Hoodie")]
    SlimeHoodie = 247,
    [Description("Force Hoodie")]
    ForceHoodie = 248
}
using System.ComponentModel;

namespace CrypToadzChained.Shared;

public enum ParityScope
{
    [Description("All")]
    All,

    [Description("All Generated")]
    AllGenerated,

    [Description("All Customs")]
    AllCustoms,

    [Description("Custom Images")]
    CustomImages,

    [Description("Small Custom Images")]
    SmallCustomImages,

    [Description("Large Custom Images")]
    LargeCustomImages,
    
    [Description("Custom Animations")]
    CustomAnimations,

    [Description("Large Custom Animations")]
    LargeCustomAnimations,

    [Description("Small Custom Animations")]
    SmallCustomAnimations
}
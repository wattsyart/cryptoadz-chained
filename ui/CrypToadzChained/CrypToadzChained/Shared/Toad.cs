using CrypToadzChained.Shared.Traits;

namespace CrypToadzChained.Shared
{
    public sealed class Toad
    {
        public Size Size { get; set; } = Size.Short;
        public Background Background { get; set; } = Background._95;
        public Body Body { get; set; } = Body.None;
        public Mouth Mouth { get; set; } = Mouth.None;
        public Head Head { get; set; } = Head.None;
        public Eyes Eyes { get; set; } = Eyes.None;
        public Clothes Clothes { get; set; } = Clothes.None;
        public AccessoryIi AccessoryIi { get; set; } = AccessoryIi.None;
        public AccessoryI AccessoryI { get; set; } = AccessoryI.None;
        public NumberOfTraits NumberOfTraits { get; set; }
    }
}

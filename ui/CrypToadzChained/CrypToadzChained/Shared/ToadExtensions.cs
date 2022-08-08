using CrypToadzChained.Shared.Traits;

namespace CrypToadzChained.Shared
{
    public static class ToadExtensions
    {
        public static Toad ToToad(this JsonTokenMetadata metadata)
        {
            var toad = new Toad();

            TrySetEnumValueMatch<Size>(toad, metadata);
            TrySetEnumValueMatch<Background>(toad, metadata);
            TrySetEnumValueMatch<Body>(toad, metadata);
            TrySetEnumValueMatch<Mouth>(toad, metadata);
            TrySetEnumValueMatch<Head>(toad, metadata);
            TrySetEnumValueMatch<Eyes>(toad, metadata);
            TrySetEnumValueMatch<Clothes>(toad, metadata);
            TrySetEnumValueMatch<AccessoryIi>(toad, metadata);
            TrySetEnumValueMatch<AccessoryI>(toad, metadata);

            return toad;
        }

        private static void TrySetEnumValueMatch<T>(Toad toad, JsonTokenMetadata metadata) where T : Enum
        {
            var propertyName = typeof(T).Name;

            var traitType = propertyName switch
            {
                nameof(Toad.AccessoryI) => "Accessory I",
                nameof(Toad.AccessoryIi) => "Accessory II",
                _ => propertyName
            };

            var traitValue = metadata.Attributes.SingleOrDefault(x => x.TraitType == traitType)?.Value?.ToString()
                    ?.Replace(" ", "")
                    .Replace("-", "")
                    .Replace("&", "")
                ;

            foreach (var value in Enum.GetValues(typeof(T)))
            {
                if (traitValue == Enum.GetName(typeof(T), value))
                {
                    var property = typeof(Toad).GetProperty(propertyName);
                    if (property != null)
                    {
                        property.SetValue(toad, value);
                    }
                }
            }
        }

        public static byte[] ToMetadataBuffer(this Toad toad)
        {
            var buffer = new List<byte>
            {
                (byte) toad.Size,
                (byte) toad.Background
            };

            if (toad.Body != Body.None)
                buffer.Add((byte)toad.Body);

            if (toad.Mouth != Mouth.None)
                buffer.Add((byte)toad.Mouth);

            if (toad.Head != Head.None)
                buffer.Add((byte)toad.Head);

            if (toad.Eyes != Eyes.None)
                buffer.Add((byte)toad.Eyes);

            if (toad.Clothes != Clothes.None)
                buffer.Add((byte)toad.Clothes);

            if (toad.AccessoryIi != AccessoryIi.None)
                buffer.Add((byte)toad.AccessoryIi);

            if (toad.AccessoryI != AccessoryI.None)
                buffer.Add((byte)toad.AccessoryI);

            buffer.Add((byte)toad.NumberOfTraits);

            var meta = buffer.ToArray();
            return meta;
        }
    }
}

using System.ComponentModel;

namespace CrypToadzChained.Shared.Traits
{
	public enum Background : byte
	{
		[Description("None")]
		None = 17,
		[Description("95")]
		_95 = 0,
		[Description("Violet")]
		Violet = 1,
		[Description("Greyteal")]
		Greyteal = 2,
		[Description("Greige")]
		Greige = 3,
		[Description("Damp")]
		Damp = 4,
		[Description("Grey Foam")]
		GreyFoam = 5,
		[Description("Bubblegum")]
		Bubblegum = 6,
		[Description("Universe Foam")]
		UniverseFoam = 7,
		[Description("Dark")]
		Dark = 8,
		[Description("Mold")]
		Mold = 9,
		[Description("Blanket")]
		Blanket = 10,
		[Description("Bruise")]
		Bruise = 11,
		[Description("Middlegrey")]
		Middlegrey = 12,
		[Description("Salmon")]
		Salmon = 13,
		[Description("Blood")]
		Blood = 14,
		[Description("Ghost Crash")]
		GhostCrash = 15,
		[Description("Matrix")]
		Matrix = 16
	}
}

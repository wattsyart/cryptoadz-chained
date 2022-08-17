using Microsoft.Extensions.Options;

namespace TehGM.Discord.Interactions.Services
{
    /// <summary>Validates instances of <see cref="DiscordInteractionsOptions"/>.</summary>
    public class DiscordInteractionsOptionsValidator : IValidateOptions<DiscordInteractionsOptions>
    {
        /// <inheritdoc/>
        public ValidateOptionsResult Validate(string name, DiscordInteractionsOptions options)
        {
            if (string.IsNullOrWhiteSpace(options.PublicKey))
                return ValidateOptionsResult.Fail($"{nameof(options.PublicKey)} is required and cannot be null or empty.");

            // commands registration
            if (options.RegisterCommands)
            {
                if (string.IsNullOrWhiteSpace(options.ApplicationID))
                    return ValidateOptionsResult.Fail($"{nameof(options.ApplicationID)} is required when {nameof(options.RegisterCommands)} is enabled.");
                if (string.IsNullOrWhiteSpace(options.UserAgent))
                    return ValidateOptionsResult.Fail($"{nameof(options.UserAgent)} is required when {nameof(options.RegisterCommands)} is enabled.");
                if (string.IsNullOrWhiteSpace(options.BaseApiURL))
                    return ValidateOptionsResult.Fail($"{nameof(options.BaseApiURL)} is required when {nameof(options.RegisterCommands)} is enabled.");
                if (string.IsNullOrWhiteSpace(options.BearerToken) && string.IsNullOrWhiteSpace(options.BotToken))
                    return ValidateOptionsResult.Fail($"Either {nameof(options.BearerToken)} or {nameof(options.BotToken)} is required when {nameof(options.RegisterCommands)} is enabled.");
            }

            // all passed? great!
            return ValidateOptionsResult.Success;
        }
    }
}

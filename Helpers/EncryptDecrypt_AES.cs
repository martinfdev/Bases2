using System.Security.Cryptography;
using System.Text;

namespace AppPdfGenAccountStatus.Helpers
{
	public static class EncryptDecrypt_AES
	{
		private static string ResponseKey = "p@ssw0rd.S3gur@";

		private static string ResponseIv = "p@ssw0rd.S3gur@";

		private static byte[] Key = Encoding.ASCII.GetBytes(ResponseKey);

		private static byte[] IV = Encoding.ASCII.GetBytes(ResponseIv);

		public static string EncryptStringToBytes_Aes(string plainText)
		{
			if (plainText == null || plainText.Length <= 0)
			{
				throw new ArgumentNullException("plainText");
			}
			if (Key == null || Key.Length == 0)
			{
				throw new ArgumentNullException("key");
			}
			if (IV == null || IV.Length == 0)
			{
				throw new ArgumentNullException("key");
			}
			if ((Key.Length != 0) & (Key.Length < 16))
			{
				Array.Resize(ref Key, 16);
			}
			if (((Key.Length > 16) & (Key.Length < 32)) || Key.Length > 32)
			{
				Array.Resize(ref Key, 32);
			}
			if ((IV.Length != 0) & (IV.Length < 16 || IV.Length > 16))
			{
				Array.Resize(ref IV, 16);
			}
			byte[] encrypted;
			using (RijndaelManaged rijAlg = new RijndaelManaged())
			{
				rijAlg.Mode = CipherMode.CBC;
				rijAlg.Padding = PaddingMode.ISO10126;
				rijAlg.FeedbackSize = 128;
				rijAlg.Key = Key;
				rijAlg.IV = IV;
				ICryptoTransform encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);
				using MemoryStream msEncrypt = new MemoryStream();
				using CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
				using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
				{
					swEncrypt.Write(plainText);
				}
				encrypted = msEncrypt.ToArray();
			}
			return Convert.ToBase64String(encrypted);
		}

		public static string DecryptStringFromBytes_Aes(string Text)
		{
			byte[] cipherText = Convert.FromBase64String(Text);
			if (cipherText == null || cipherText.Length == 0)
			{
				throw new ArgumentNullException("texto cifrado vacío");
			}
			if (Key == null || Key.Length == 0)
			{
				throw new ArgumentNullException("key vacía");
			}
			if (IV == null || IV.Length == 0)
			{
				throw new ArgumentNullException("vector de inicialización vacío");
			}
			if ((Key.Length != 0) & (Key.Length < 16))
			{
				Array.Resize(ref Key, 16);
			}
			if (((Key.Length > 16) & (Key.Length < 32)) || Key.Length > 32)
			{
				Array.Resize(ref Key, 32);
			}
			if ((IV.Length != 0) & (IV.Length < 16 || IV.Length > 16))
			{
				Array.Resize(ref IV, 16);
			}
			string plaintext = null;
			using (RijndaelManaged rijAlg = new RijndaelManaged())
			{
				rijAlg.Mode = CipherMode.CBC;
				rijAlg.Padding = PaddingMode.ISO10126;
				rijAlg.FeedbackSize = 128;
				rijAlg.Key = Key;
				rijAlg.IV = IV;
				ICryptoTransform decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
				try
				{
					using MemoryStream msDecrypt = new MemoryStream(cipherText);
					using CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
					using StreamReader srDecrypt = new StreamReader(csDecrypt);
					plaintext = srDecrypt.ReadToEnd();
				}
				catch
				{
					plaintext = "Key o IV Incorrecto";
				}
			}
			return plaintext;
		}
	}
}
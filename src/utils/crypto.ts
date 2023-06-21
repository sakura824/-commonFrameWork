import CryptoJS from 'crypto-js'


//字符串进行解密
const uncompileStr = code => {
	code = unescape(code)
	var c = String.fromCharCode(code.charCodeAt(0) - code.length)
	for (var i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
	}
	return c
}

const keyCode = `%8F%CA%BF%B6%7E%85%BA%CE%D1%BA%94%8Ao%9B%E7%DE%DE%E8%A7%8C%AD%98%7Ez`
const key =  uncompileStr(keyCode)  //十六位十六进制数作为默认密钥
const ivCode =  `b%A4%B4%CB%E0%E8%A8%A9%A5%95%D2%A9%99%8C%A2%D5%CC%B2%B3%9B%7F%C1%B4z`
const iv =  uncompileStr(ivCode)  //十六位十六进制数作为默认密钥偏移量


/**
 * AES加密
 * @param plainText 明文
 * @param keyInBase64Str base64编码后的key
 * @param ivInBase64Str base64编码后的初始化向量(只有CBC模式下才支持)
 * @return base64编码后的密文
 */
export function Encrypt(plainText, keyInBase64Str = key, ivInBase64Str = iv) {
	let key = CryptoJS.enc.Base64.parse(keyInBase64Str)
	let iv = CryptoJS.enc.Base64.parse(ivInBase64Str)
	let encrypted = CryptoJS.AES.encrypt(plainText, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	})
	// 这里的encrypted不是字符串，而是一个CipherParams对象
	return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

/**
 * AES解密
 * @param cipherText 密文
 * @param keyInBase64Str base64编码后的key
 * @param ivInBase64Str base64编码后的初始化向量(只有CBC模式下才支持)
 * @return 明文
 */
export function Decrypt(cipherText, keyInBase64Str = key, ivInBase64Str = iv) {
	let key = CryptoJS.enc.Base64.parse(keyInBase64Str)
	let iv = CryptoJS.enc.Base64.parse(ivInBase64Str)
	// 返回的是一个Word Array Object，其实就是Java里的字节数组
	let decrypted = CryptoJS.AES.decrypt(cipherText, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	})

	return decrypted.toString(CryptoJS.enc.Utf8)
}
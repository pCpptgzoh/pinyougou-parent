package com.pinyougou.shop.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import entity.Result;
import util.FastDFSClient;
/**
 * 上传的控制
 * @author lenovo
 *
 */
@RestController
public class UploadController {
	
	
	@Value("${FILE_SERVER_URL}")
	private String FILE_SERVER_URL;
	
	@RequestMapping("/upload")
	public Result upload(MultipartFile file) {
		
		
		
		try {
			FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
			
			String url = fastDFSClient.uploadFile(file.getBytes(), 
					file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1));
			return new Result(true, FILE_SERVER_URL + url);
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "上传失败");
		}
	}
	
	
	
	
	
}

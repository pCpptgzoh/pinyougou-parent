package com.pinyougou.sellergoods.service;

import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

/**
 * 服务层接口
 * @author lenovo
 *
 */
public interface BrandService {

	/**
	 * 返回全部列表
	 */
	public List<TbBrand> findAll();
	
	
	/**
	 * 分页查询
	 */
	public PageResult findPage(int pageNum, int pageSize);
	
	/**
	 * 保存品牌
	 */
	public void add(TbBrand brand);
	
	
	/**
	 * 修改品牌
	 */
	public void update(TbBrand brand);
	
	
	/**
	 * 根据id查询品牌
	 */
	public TbBrand findOne(Long id);
	
	
	/**
	 * 批量删除品牌
	 */
	public void delete(Long[] ids);
	
	/**
	 * 条件查询
	 */
	public PageResult findPage(TbBrand brand, int pageNum, int pageSize);
	
	/**
	 * 品牌作为select2的下拉框
	 * @return
	 */
	List<Map> selectOptionList();
}

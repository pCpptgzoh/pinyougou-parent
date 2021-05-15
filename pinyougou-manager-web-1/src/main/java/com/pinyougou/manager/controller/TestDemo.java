package com.pinyougou.manager.controller;

import java.util.HashMap;
import java.util.Map;

public class TestDemo {

	
	
	public static void main(String[] args) {
		int[] nums = {1,1,1,1};
		// System.out.println(containsDuplicate02(nums));
		containsDuplicate02(nums);
	}
	
	
	public static boolean containsDuplicate02(int[] nums) {
		Map<Integer, Integer> map = new HashMap<>();
        for(int i : nums) {
            // 一旦元素相同了,map里面是存不进元素的,所有返回的是null
            /*if(map.put(i, i) != null) {
                return true;
            }*/
        	// map.put(i, i);
        	System.out.println(map.put(i, i));
        }
        System.out.println("========");
        System.out.println(map);
        System.out.println("========");
        return false;
	}
}

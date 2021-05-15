package entity;

import java.io.Serializable;
import java.util.List;

/**
 * 分页结果封装对象
 * @author lenovo
 *
 */
public class PageResult implements Serializable {

	public Long total;  // 总记录数
	public List rows;   // 当前页的记录数
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
	public List getRows() {
		return rows;
	}
	public void setRows(List rows) {
		this.rows = rows;
	}
	public PageResult(Long total, List rows) {
		super();
		this.total = total;
		this.rows = rows;
	}
	@Override
	public String toString() {
		return "PageResult [total=" + total + ", rows=" + rows + "]";
	}
	
	
}

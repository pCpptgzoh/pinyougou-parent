package entity;
/**
 * 返回给页面的结果集
 * @author lenovo
 *
 */
public class Result {

	public boolean success;  // 是否成功
	public String message;	 // 提示信息
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Result(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	
}

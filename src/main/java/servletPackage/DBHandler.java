package servletPackage;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DBHandler
{
	private static final String PASSWORD = "";
	private static final String USER= "root";
	private static final String URL = "jdbc:mysql://localhost:3306/library_Manager";
	private static final String CLASS_PATH = "com.mysql.cj.jdbc.Driver";
	public DBHandler(){}
	
	public static JSONArray returnBooks() throws JSONException, SQLException 		
	{
        Connection con;
        JSONArray json=null;
        ResultSet rs=null;
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement("select * from book");
            rs=st.executeQuery();
            json= rsToJSON(rs,con);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return json;
		
	}
	
	public static JSONArray returnAccounts() 		
	{
        Connection con;
        ResultSet rs=null;
        JSONArray json=null;
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement("select * from account");
            rs=st.executeQuery();
            json= rsToJSON(rs,con);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return json;
	}
	
	public static String returnPassw(String uname) {
		
		Connection con;
		ResultSet rs=null;
		String passw="";
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement("select passw from account where uname=?");
			st.setString(1, uname);
			rs=st.executeQuery();
			rs.next();
			passw=rs.getString(1);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return passw;
	}
	
	
	
	public static JSONArray returnGenreBooks(String genre) {
		
		Connection con;
		ResultSet rs=null;
		JSONArray json=null;
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement("select * from book where Genre=?");
			st.setString(1, genre);
			rs=st.executeQuery();
			json= rsToJSON(rs,con);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return json;
	}
	
	public static JSONArray returnBorrowals() {
		
		Connection con;
		ResultSet rs=null;
		JSONArray json=null;
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement(""
					+ "SELECT bookId,BookName,uname,returnDate FROM book NATURAL JOIN borrowals ");
			rs=st.executeQuery();
			json= rsToJSON(rs,con);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return json;
		
	}
	
	public static JSONArray returnBorrowal(String uname) {
		
		Connection con;
		ResultSet rs=null;
		JSONArray json=null;
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement(""
					+ "SELECT bookId,BookName,uname,returnDate FROM book NATURAL JOIN borrowals where uname=?");
			st.setString(1, uname);
			rs=st.executeQuery();
			json= rsToJSON(rs,con);
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return json;
		
	}
	
	public static int addMember(String acc_name,String email,String address,String uname,String passw,String phn,String val) {
		
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"INSERT INTO `account`(`Name`, `Phn`, `email`, `address`, `uname`, `passw`, `Validity`)"
					+ "VALUES(?,?,?,?,?,?,?)");
			st.setString(1,acc_name);
            st.setString(2,phn);
            st.setString(3,email);
            st.setString(4,address);
            st.setString(5,uname);
            st.setString(6,passw);
            st.setString(7,val);
            rs=st.executeUpdate();
            
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
		
	}
	
	public static int addBook(String book_name,String author_name,String genre,String avail) {
		
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"INSERT INTO `book`(`BookName`, `AuthorName`, `Genre`, `Availability`)"
					+ "VALUES(?,?,?,?)");
			st.setString(1,book_name);
            st.setString(2,author_name);
            st.setString(3,genre);
            st.setString(4,avail);
            rs=st.executeUpdate();
            
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
		
	}
	
	public static void updateStatus(String bookId,String status) {
		
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
			System.out.println("Here");
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"UPDATE `book` SET `Availability` =? WHERE `book`.`bookId` = ?;");
			st.setString(2,bookId);
            st.setString(1,status);
            rs=st.executeUpdate();
            
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		
	}
	
	public static int addBorrowal(String bookId,String uname,String returnDate) {
		
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
		 if(DBHandler.checkAvailability(bookId).equals("A")) {
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"INSERT INTO `borrowals`(`uname`,`bookId`, `returnDate`)"
					+ "VALUES(?,?,?)");
			st.setString(1,uname);
			st.setString(3,returnDate);
            st.setString(2, bookId);
            rs=st.executeUpdate();
            DBHandler.updateStatus(bookId, "NA");
            
		  }else {
			return rs;
		   }
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
		
	}

	public static int removeBorrowal(String bookId, String uname) {
		
		
		// TODO Auto-generated method stub
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"DELETE FROM `borrowals` WHERE bookId=? AND uname=?");
			st.setString(1,bookId);
            st.setString(2,uname);
            rs=st.executeUpdate();
            DBHandler.updateStatus(bookId,"A");
            con.close();
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
	}
	
	public static int removeBook(String bookId) {
		
		
		// TODO Auto-generated method stub
		Connection con;
        @SuppressWarnings("unused")
		int rs = -1;
        
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"DELETE FROM `book` WHERE bookId=?");
			st.setString(1,bookId);
			rs=st.executeUpdate();
            
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
	}

	public static int removeAccount(String uname) {
	
	
		// TODO Auto-generated method stub
		Connection con;
	    @SuppressWarnings("unused")
		int rs = -1;
	    
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement)con.prepareStatement(
					"DELETE FROM `account` WHERE uname=?");
			st.setString(1,uname);
			rs=st.executeUpdate();
	        
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}	
		return rs;
	}

	public static String checkAvailability(String bookId)  {
		// TODO Auto-generated method stub
		Connection con;
		ResultSet rs=null;
		String avail="";
		try
		{
			Class.forName(CLASS_PATH);
			con=DriverManager.getConnection(URL,USER,PASSWORD);
			PreparedStatement st=(PreparedStatement) con.prepareStatement("select Availability from book where bookId=?");
			st.setString(1, bookId);
			rs=st.executeQuery();
			rs.next();
			avail=rs.getString(1);
			rs.close();
			con.close();
		}
		catch(Exception ex)
		{
			System.out.println(ex);
		}
		return avail;
	}





	public static JSONArray rsToJSON(ResultSet rs,Connection con) throws JSONException, SQLException {
		
		
		JSONArray json = new JSONArray();
		ResultSetMetaData rsmd = rs.getMetaData();
		while(rs.next()) {
		  int numColumns = rsmd.getColumnCount();
		  JSONObject obj = new JSONObject();
		  for (int i=1; i<=numColumns; i++) {
		    String column_name = rsmd.getColumnName(i);
		    if(!column_name.equals("passw"))
		    	obj.put(column_name, rs.getObject(column_name));
		  }
		  json.put(obj);	
		}
		rs.close();
		con.close();
		return json;
	
	}

}
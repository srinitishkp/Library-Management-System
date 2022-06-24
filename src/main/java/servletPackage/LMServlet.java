package servletPackage;
import javax.servlet.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.*;

import java.sql.SQLException;

import javax.servlet.http.*;
public class LMServlet extends HttpServlet {

	private static final String CHAR_ENC = "UTF-8";
	private static final long serialVersionUID = 1L;
	private static final String CONTENT_TYPE = "application/json";
	private static final String ACCOUNT="/account";
	private static final String BOOK="/book";
	private static final String BORROWAL="/borrowal";

	public void init() throws ServletException {
		
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		final String REQ_PATH=req.getPathInfo();	
		final String ACTION=req.getHeader("ACTION");
		JSONArray rs = null;
		res.setContentType(CONTENT_TYPE);
		res.setCharacterEncoding(CHAR_ENC);
		System.out.println("Path:"+REQ_PATH);
		System.out.println("Action:"+ACTION);
		PrintWriter out = res.getWriter();
		switch(REQ_PATH) {
		
			case BOOK:
				
				switch(ACTION) {
				
					case "getBooks":
						
					try {
						rs = DBHandler.returnBooks();
					} catch (JSONException | SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
						writeResult(rs,out);
						break;
						
					case "getGenreBooks":
						
					{
						String genre=req.getHeader("Genre");
						rs = DBHandler.returnGenreBooks(genre);
						writeResult(rs,out);
						break;
					}
									
						
					default:
						res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Action Not found");
						
				}
				break;
				
			case BORROWAL:
				
				switch(ACTION) {
				
					case  "getBorrowalList":
						
						rs=DBHandler.returnBorrowals();
						writeResult(rs,out);
						break;
					
					case "getBorrowal":
						
					{
						
						String uname=req.getHeader("uname");
						rs=DBHandler.returnBorrowal(uname);
						writeResult(rs,out);
						break;
				
					}
							
					default:
						res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Action Not found");
				
				}
				break;

			case ACCOUNT:
				
				switch(ACTION) {
				
					case  "getAccountList":
						
						rs=DBHandler.returnAccounts();
						writeResult(rs,out);
						break;
						
					case "validatePassw":
						
					{	
							
						String uname=req.getHeader("uname");
						String passw=req.getHeader("passw");	
						String password=DBHandler.returnPassw(uname);
						if(password.equals(passw)) {
							res.setStatus(HttpServletResponse.SC_OK);
						}
						else {
							res.setStatus(HttpServletResponse.SC_UNAUTHORIZED,"Password mismatch");
						}	
						break;
					
					}
					
			
					default:
						res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Action Not found");
				
				}
				break;

			default:
				
				res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Path");
				
		}
		
	}
	
	public void writeResult(JSONArray resJSON,PrintWriter out)  {
		
		try {		
				
				out.print(resJSON);
			
		} catch (JSONException e) {
			
			// TODO Auto-generated catch block
			e.printStackTrace();
		
		} 
			
	}
	
	
	
	public String readJSON(BufferedReader reader) {
		
		String line = null;
		StringBuffer jb=new StringBuffer();
		try {
			  
			while ((line = reader.readLine()) != null)
				 jb.append(line);
			
		 } catch (Exception e) { 
			 
			 System.out.println(e);
			 
		 }
		return jb.toString();
	}

	

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		 final String REQ_PATH=req.getPathInfo();
		 final String ACTION=req.getHeader("ACTION");
		 res.setContentType(CONTENT_TYPE);
		 res.setCharacterEncoding(CHAR_ENC);
		 System.out.println("Path:"+REQ_PATH);
		 System.out.println("Action:"+ACTION);
		 BufferedReader reader = req.getReader();
		 String jsonData=readJSON(reader);
		 JSONObject jsonObject = new JSONObject(jsonData);
		 switch(REQ_PATH) {
			
			case BOOK:
				
				switch(ACTION){
					
					case "insertBook":
						
						{ 
							 System.out.println("Here");
							 String book_name=jsonObject.getString("BookName");
							 String author_name=jsonObject.getString("AuthorName");
							 String genre=jsonObject.getString("Genre");
							 String avail=jsonObject.getString("Availability");
							 if(!(book_name.equals("")|author_name.equals("")|genre.equals("")|avail.equals("") ))
								 DBHandler.addBook(book_name,author_name,genre,avail);
							 else
								 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
							 break;

						}
						
					
					default:
						
						res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Action");
					
				}
				break;
				
			case BORROWAL:
				
				switch(ACTION) {
				
					case "newBorrowal":
						
						{	
							int result=-1;
							String uname=jsonObject.getString("uname");
							String bookId = Integer.toString(jsonObject.getInt("bookId"));
							Date returnDate = new Date();
							Calendar c = Calendar.getInstance();
					        c.setTime(returnDate);
					        c.add(Calendar.MONTH, 1);
					        returnDate=c.getTime();
					        SimpleDateFormat formatter=new SimpleDateFormat("yyyy/MM/dd");
					        String retDate=formatter.format(returnDate);
							if(!(uname.equals("")|returnDate.equals("")|bookId.equals("")))
							{
								result=DBHandler.addBorrowal(bookId,uname,retDate);
								if(result==1) {
									res.setStatus(HttpServletResponse.SC_OK);
								}
								else {
									res.sendError(HttpServletResponse.SC_PRECONDITION_FAILED,"Book not available");
								}
							}
							else
								 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
							break;
						}
					
					
						
					default:
				
						res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Action");
				
				 }
				 break;
				
			case ACCOUNT:
				
				switch(ACTION) {
				
					case "addMember":
						
						{
							String acc_name=jsonObject.getString("AccountName");
							String email=jsonObject.getString("Email");
							String address=jsonObject.getString("Address");
							String uname=jsonObject.getString("UserName");
							String passw=jsonObject.getString("Password");		 
							String phn=Integer.toString(jsonObject.getInt("Phone"));
							String val=Integer.toString(jsonObject.getInt("Validity"));
							
							if(!(acc_name.equals("")|email.equals("")|address.equals("")|uname.equals("")|
									passw.equals("")|phn.equals("")|val.equals("")))
								DBHandler.addMember(acc_name,email,address,uname,passw,phn,val);
							else
								 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
							break;
						}
						
					
						
					default:
						
						res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Action");
				}
				break;
				
			default:
				
				res.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Path");
				
		}
		 

	}
	
	public void doDelete(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException {
		
		final String REQ_PATH=req.getPathInfo();	
		final String ACTION=req.getHeader("ACTION");
		System.out.println("Path:"+REQ_PATH);
		System.out.println("Action:"+ACTION);
		BufferedReader reader = req.getReader();
		String jsonData=readJSON(reader);
		JSONObject jsonObject = new JSONObject(jsonData);
		switch(REQ_PATH) {
			
			case BOOK:
			{
				int result=-1;
				String bookId = Integer.toString(jsonObject.getInt("BookId"));
				if(!bookId.equals(""))
				{
					result=DBHandler.removeBook(bookId);
					if(result==1)
						res.setStatus(HttpServletResponse.SC_OK);
				}
				else
					 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
				break;
			}
			case BORROWAL:
			{	
				int result=-1;
				String uname=jsonObject.getString("uname");
				String bookId = Integer.toString(jsonObject.getInt("BookId"));
				if(!(uname.equals("")|bookId.equals("")))
				{
					result=DBHandler.removeBorrowal(bookId,uname);
					if(result==1)
						res.setStatus(HttpServletResponse.SC_OK);					
				}
				else
					 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
				break;
			}
			case ACCOUNT:
			{
				int result=-1;
				String uname=jsonObject.getString("uname");
				if(!uname.equals(""))
				{
					result=DBHandler.removeAccount(uname);
					if(result==1)
						res.setStatus(HttpServletResponse.SC_OK);
				}
				else
					 res.sendError(HttpServletResponse.SC_BAD_REQUEST,"Missing Data");
				break;
			}
		}
	}
	
	
	public void destroy() {
	}

}
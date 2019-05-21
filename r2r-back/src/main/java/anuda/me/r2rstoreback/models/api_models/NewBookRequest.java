package anuda.me.r2rstoreback.models.api_models;

public class NewBookRequest {

    private String name;
    private String author;
    private String picurl;
    private int trendingStatus;
    private String category;
    private String details;
    private int price;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPicurl() {
        return picurl;
    }

    public void setPicurl(String picurl) {
        this.picurl = picurl;
    }

    public int getTrendingStatus() {
        return trendingStatus;
    }

    public void setTrendingStatus(int trendingStatus) {
        this.trendingStatus = trendingStatus;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

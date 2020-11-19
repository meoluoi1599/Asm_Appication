package asm.android;

public class ratingObject {
    private String restaurantName, restaurantType, price, date_visit, serviceRating, foodRating, cleanlinessRating, total, reporter,note;

//    public ratingObject() {
//
//    }

    public ratingObject(String restaurantName, String restaurantType, String price, String date_visit, String serviceRating, String foodRating, String cleanlinessRating, String total, String reporter, String note) {
        this.restaurantName = restaurantName;
        this.restaurantType = restaurantType;
        this.price = price;
        this.date_visit = date_visit;
        this.serviceRating = serviceRating;
        this.foodRating = foodRating;
        this.cleanlinessRating = cleanlinessRating;
        this.total = total;
        this.reporter = reporter;
        this.note = note;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantType() {
        return restaurantType;
    }

    public void setRestaurantType(String restaurantType) {
        this.restaurantType = restaurantType;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDate_visit() {
        return date_visit;
    }

    public void setDate_visit(String date_visit) {
        this.date_visit = date_visit;
    }

    public String getServiceRating() {
        return serviceRating;
    }

    public void setServiceRating(String serviceRating) {
        this.serviceRating = serviceRating;
    }

    public String getFoodRating() {
        return foodRating;
    }

    public void setFoodRating(String foodRating) {
        this.foodRating = foodRating;
    }

    public String getCleanlinessRating() {
        return cleanlinessRating;
    }

    public void setCleanlinessRating(String cleanlinessRating) {
        this.cleanlinessRating = cleanlinessRating;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

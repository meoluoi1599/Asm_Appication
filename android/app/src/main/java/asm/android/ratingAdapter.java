package asm.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;

import asm.android.ratingObject;


public class ratingAdapter extends ArrayAdapter<ratingObject> {
    private Context rating;
    private ArrayList<ratingObject> arr;

    public ratingAdapter(@NonNull Context context, int resource, @NonNull List<ratingObject> objects) {
        super(context, resource, objects);

        this.rating = context;
        this.arr = new ArrayList<>(objects);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) rating.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.items, null);
        }
        if (arr.size() > 0) {
            ratingObject rating = this.arr.get(position);
            TextView resName = convertView.findViewById(R.id.txvResName);
            TextView type = convertView.findViewById(R.id.txvType);
            TextView price = convertView.findViewById(R.id.txvPrice);
            TextView date = convertView.findViewById(R.id.txvDate);
            TextView service = convertView.findViewById(R.id.txvService);
            TextView food = convertView.findViewById(R.id.txvFood);
            TextView clean = convertView.findViewById(R.id.txvClean);
            TextView total = convertView.findViewById(R.id.txvTotal);
            TextView repoter = convertView.findViewById(R.id.txvReporter);
            TextView note = convertView.findViewById(R.id.txvNote);

            resName.setText(rating.getRestaurantName());
            type.setText(rating.getRestaurantType());
            price.setText(rating.getPrice());
            date.setText(rating.getDate_visit());
            service.setText(rating.getServiceRating());
            food.setText(rating.getFoodRating());
            clean.setText(rating.getCleanlinessRating());
            total.setText(rating.getTotal());
            repoter.setText(rating.getReporter());
            note.setText(rating.getNote());
        }
        return convertView;
    }
}
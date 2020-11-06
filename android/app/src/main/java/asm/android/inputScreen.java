package asm.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class inputScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_input_screen);
        Spinner dropdown = findViewById(R.id.spinner1);
        String[] items = new String[]{"Need to improve", "Okay", "Good", "Excellent"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items);
        dropdown.setAdapter(adapter);

        Spinner dropdown2 = findViewById(R.id.spinner2);
        String[] list = new String[]{"Need to improve", "Okay", "Good", "Excellent"};
        ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, list);
        dropdown2.setAdapter(adapter2);

        Spinner dropdown3 = findViewById(R.id.spinner3);
        String[] lists = new String[]{"Need to improve", "Okay", "Good", "Excellent"};
        ArrayAdapter<String> adapter3 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, lists);
        dropdown3.setAdapter(adapter3);
    }

    public void sendFeedback(View view) {
        final EditText nameField = (EditText) findViewById(R.id.editName);
        String name = nameField.getText().toString();

        if(name.length() == 0){
            nameField.setError("Please Enter Restaurant Name");
        }

        final EditText type = (EditText) findViewById(R.id.editType);
        String typeEdit = type.getText().toString();
        if(typeEdit.length() == 0){
            type.setError("Please Enter Restaurant type");
        }

        final EditText date = (EditText) findViewById(R.id.editDate);
        String dateEdit = date.getText().toString();
        if(dateEdit.length() == 0){
            date.setError("Please Enter Date Visited");
        }

        final EditText price = (EditText) findViewById(R.id.editPrice);
        String priceEdit = price.getText().toString();
        if(priceEdit.length() == 0){
            price.setError("Please Enter Price Per Person");
        }

        final EditText reporter = (EditText) findViewById(R.id.editReporter);
        String reporterEdit = reporter.getText().toString();
        if(reporterEdit.length() == 0){
            reporter.setError("Please Enter Reporter");
        }

        if (name.length() > 0 && typeEdit.length() > 0 && dateEdit.length() > 0 && priceEdit.length() > 0 && reporterEdit.length() > 0) {
            URL url = null;
            String postDataBytes = "ahahah";

            try {
                url = new URL("http://10.0.2.2:5000/rate");
                HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                httpURLConnection.setRequestMethod("POST");
                httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                httpURLConnection.setRequestProperty("Content-Length", String.valueOf(postDataBytes));
                httpURLConnection.setDoOutput(true);

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}
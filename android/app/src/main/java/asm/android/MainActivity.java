package asm.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;

import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.widget.GridView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.lang.reflect.Type;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private  static Context context;
    GridView grvRating;
    ratingAdapter adapter;
    ArrayList<ratingObject> ratingObjectArrayList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        context = this;
        fetchData proc = new fetchData();
        proc.execute();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SystemClock.sleep(1000);
        setClick();
        anhXa();
        setUp();
    }

    private void anhXa(){
        grvRating = findViewById(R.id.grvListRating);
    }

    private  void setUp() {
        grvRating.setAdapter(adapter);
    }

    private void  setClick(){}

    public void sendFeedback(View view) {
        Intent intent=new Intent(MainActivity.this,inputScreen.class);
        startActivity(intent);
    }

    class fetchData extends AsyncTask {
        String data ="";
        @Override
        protected Object doInBackground(Object[] objects) {
            try {
                URL url = new URL("http://10.0.2.2:5000/get_rating");
                HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                InputStream inputStream = httpURLConnection.getInputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                String line = "";
                while(line != null){
                    line = bufferedReader.readLine();
                    if(line != null){
                        data = data + line;
                    }
                }
                Log.d("Data",data);
                Gson g = new Gson();
                Type listType = new TypeToken<ArrayList<ratingObject>>(){}.getType();
                List<ratingObject> yourClassList = new Gson().fromJson(data, listType);
                ratingObjectArrayList = g.fromJson(data,new ArrayList<ratingObject>(){}.getClass());
                Log.d("Len",Integer.toString(yourClassList.size()));

                ratingObjectArrayList = (ArrayList)yourClassList;
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();}
            adapter = new ratingAdapter(context, 0, ratingObjectArrayList);
            return null;
        }
    }
}


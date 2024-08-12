package com.zeus.backend.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class WeatherController {
	// 날씨 정보 가져오기
	@Value("${weather_service_key}")
	private String weather_service_key;

	@GetMapping("/api/weather")
	public ResponseEntity<?> getWeather() {
		Date date = new Date();
		SimpleDateFormat formmat = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat formmat2 = new SimpleDateFormat("HHmm");

		String currentDate = formmat.format(date);
		String currentTime = formmat2.format(date);

		StringBuilder urlBuilder = new StringBuilder(
				"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"); /* URL */
		JSONArray weatherItems = null;
		try {
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "="
					+ URLEncoder.encode(weather_service_key, "UTF-8"));
			urlBuilder.append(
					"&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
			urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
					+ URLEncoder.encode("1000", "UTF-8")); /* 한 페이지 결과 수 */
			urlBuilder.append("&" + URLEncoder.encode("dataType", "UTF-8") + "="
					+ URLEncoder.encode("JSON", "UTF-8")); /* 요청자료형식(XML/JSON) Default: XML */
			urlBuilder.append("&" + URLEncoder.encode("base_date", "UTF-8") + "="
					+ URLEncoder.encode(currentDate, "UTF-8")); /* ‘21년 6월 28일 발표 */
			urlBuilder.append("&" + URLEncoder.encode("base_time", "UTF-8") + "="
					+ URLEncoder.encode(currentTime, "UTF-8")); /* 06시30분 발표(30분 단위) */
			urlBuilder.append(
					"&" + URLEncoder.encode("nx", "UTF-8") + "=" + URLEncoder.encode("55", "UTF-8")); /* 예보지점 X 좌표값 */
			urlBuilder.append(
					"&" + URLEncoder.encode("ny", "UTF-8") + "=" + URLEncoder.encode("127", "UTF-8")); /* 예보지점 Y 좌표값 */
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
			System.out.println("Response code: " + conn.getResponseCode());
			BufferedReader rd = null;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}

			StringBuilder sb = new StringBuilder();
			String line = "";
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();

			System.out.println(sb.toString());

			JSONObject jsonResponse = new JSONObject(sb.toString());
		 	weatherItems = jsonResponse.getJSONObject("response").getJSONObject("body").getJSONObject("items")
					.getJSONArray("item");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		String sky = null, pty = null;

		for (int i = 0; i < weatherItems.length(); i++) {
			JSONObject item = weatherItems.getJSONObject(i);

			String category = item.getString("category");
			String fcstValue = item.getString("fcstValue");

			if ("SKY".equals(category)) {
				if (StringUtils.isBlank(sky)) {
					sky = fcstValue;
					System.out.println("SKY item " + item);
				}
			} else if ("PTY".equals(category)) {
				if (StringUtils.isBlank(pty)) {
					pty = fcstValue;
					System.out.println("PTY item " + item);
				}
			}
		}

		// 데이터를 가져오지 못한 경우 초기값
		if (sky == null) {
			sky = "1";
		}
		if (pty == null) {
			pty = "0";
		}

		System.out.println("sky " + sky + " pty " + pty);
		Map<String, Object> weather = new HashMap<>();
		SimpleDateFormat format3 = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss(E)", Locale.ENGLISH);
		String formattedDate = format3.format(date);
		weather.put("date", formattedDate);

		String skyState = "";
		switch (sky) {
		case "1":
			skyState = "맑음";
			break;
		case "3":
			skyState = "구름많음";
			break;
		case "4":
			skyState = "흐림";
			break;
		default:
			skyState = "맑음";
			break;
		}

		String ptyState = "";
		switch (pty) {
		case "0":
			ptyState = "없음";
			break;
		case "1":
			ptyState = "비";
			break;
		case "2":
			ptyState = "비/눈";
			break;
		case "3":
			ptyState = "눈";
			break;
		case "4":
			ptyState = "소나기";
			break;
		default:
			ptyState = "없음";
			break;
		}

		weather.put("sky", skyState);
		weather.put("pty", ptyState);
		System.out.println("weather map " + weather);

		return ResponseEntity.ok(weather);
	}
}

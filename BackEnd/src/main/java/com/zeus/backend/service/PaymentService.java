package com.zeus.backend.service;

import java.util.Map;

public interface PaymentService {
	
	String getAccessToken();

	Map<String, Object> preparePayment(String merchantUid, int amount);
}

package com.zeus.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Payment;
import com.zeus.backend.mapper.PaymentMapper;

@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentMapper mapper;

	@Override
	public void create(Payment payment) throws Exception {
		mapper.create(payment);
	}

	@Override
	public List<Payment> list() throws Exception {
		return mapper.list();
	}

	@Override
	public List<Payment> userPayList(int user_no) throws Exception {
		return mapper.userPayList(user_no);
	}

	@Override
	public Map<String, String> getPayCountByDate() {
		return mapper.getPayCountByDate();
	}

	@Override
	public Map<String, String> getDailySalesByDate() {
		return mapper.getDailySalesByDate();
	}

	@Override
	public Map<String, String> getCumulativeSalesByDate() {
		return mapper.getCumulativeSalesByDate();
	}
	
	

}

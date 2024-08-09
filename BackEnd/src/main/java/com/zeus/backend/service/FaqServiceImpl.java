package com.zeus.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zeus.backend.domain.Faq;
import com.zeus.backend.mapper.FaqMapper;

@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	private FaqMapper mapper;

	@Override
	public void create(Faq faq) throws Exception {
		mapper.create(faq);
	}

	@Override
	public List<Faq> list() throws Exception {
		return mapper.list();
	}

	@Override
	public void modify(Faq faq) throws Exception {
		mapper.modify(faq);
	}

	@Override
	public void delete(int faq_id) throws Exception {
		mapper.delete(faq_id);
	}

	@Override
	public Faq read(int faq_id) throws Exception {
		return mapper.read(faq_id);
	}

}

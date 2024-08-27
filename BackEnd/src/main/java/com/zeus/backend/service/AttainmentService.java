package com.zeus.backend.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.zeus.backend.domain.Attainment;

public interface AttainmentService {
	List<Attainment> getAllAttainments();

	Attainment getAttainmentById(Long id);

	Attainment createAttainment(Attainment attainment);

	Attainment updateAttainment(Attainment attainment);

	void deleteAttainment(Long id);

	List<Attainment> getAttainmentsByUserIdAndRegDate(String user_id, Date reg_date);

	List<Attainment> getAttainmentsByUserIdAndDate(String user_id, String attainment_duration,
			LocalDate date);

	List<Attainment> getAttainmentsByOtherGroupIdAndDate(Long group_id, String attainmentDuration,
			LocalDate selectDate);
}
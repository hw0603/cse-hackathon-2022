package boardClone.common;

import java.io.File;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import boardClone.dto.BoardFileDto;

@Component
public class FileUtils {

	// 요청을 통해서 전달받은 파일을 저장하고, 파일 정보를 반환하는 메서드
	public List<BoardFileDto> parseFileInfo(int boardIdx, MultipartHttpServletRequest request) throws Exception {
		
		if (ObjectUtils.isEmpty(request)) {
			return null;
		}
		
		List<BoardFileDto> fileInfoList = new ArrayList<>();
		
		// 파일을 저장할 디렉터리를 설정
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
		ZonedDateTime now = ZonedDateTime.now();
		String storedDir = "images/" + now.format(dtf);
		File fileDir = new File(storedDir);
		if (!fileDir.exists()) {
			fileDir.mkdir();
		}
		
		// 업로드 파일 데이터를 디렉터리에 저장하고 정보를 리스트에 저장
		Iterator<String> fileTagNames = request.getFileNames();
		while (fileTagNames.hasNext()) {
			String originalFileExtension = "";
			String fileTagName = fileTagNames.next();
			List<MultipartFile> files = request.getFiles(fileTagName);
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					String contentType = file.getContentType();
					if (ObjectUtils.isEmpty(contentType)) {
						break;
					} else {
						if (contentType.contains("image/jpeg")) {
							originalFileExtension = ".jpg";
						} else if (contentType.contains("image/png")) {
							originalFileExtension = ".png";
						} else if (contentType.contains("image/gif")) {
							originalFileExtension = ".gif";
						} else {
							break;
						}
					}
					
					// 저장에 사용할 파일 이름을 조합
					String storedFileName = Long.toString(System.nanoTime()) + originalFileExtension;
					
					// 파일 정보를 리스트에 저장 
					BoardFileDto bfd = new BoardFileDto();
					bfd.setBoardIdx(boardIdx);
					bfd.setFileSize(file.getSize());
					bfd.setOriginalFileName(file.getOriginalFilename());
					bfd.setStoredFilePath(storedDir + "/" + storedFileName);
					fileInfoList.add(bfd);
					
					// 파일 저장
					fileDir = new File(storedDir + "/" + storedFileName);
					file.transferTo(fileDir);
				}
			}
		}
		return fileInfoList;	
	}
}

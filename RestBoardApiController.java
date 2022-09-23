package boardClone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import boardClone.dto.BoardDto;
import boardClone.service.BoardService;

@RestController
public class RestBoardApiController {
	
	@Autowired
	private BoardService boardService;
	
	@RequestMapping(value="/api/boardClone", method=RequestMethod.GET)
	public List<BoardDto> openBoardList() throws Exception{
		return boardService.selectBoardList();
	}
	
	@RequestMapping(value="/api/boardClone/{boardIdx}", method=RequestMethod.GET)
	public BoardDto openBoardDetail(@PathVariable("boardIdx") int boardIdx) throws Exception{
		return boardService.selectBoardDetail(boardIdx);
	}
	
	@RequestMapping(value="/api/boardClone/write", method=RequestMethod.POST)
	public void insertBoard(@RequestBody BoardDto board) throws Exception{
		boardService.insertBoard(board, null);
	}
	
	@RequestMapping(value="/api/boardClone/{boardIdx}", method=RequestMethod.PUT)
	public void updateBoard(@RequestBody BoardDto boardDto) throws Exception{
		boardService.updateBoard(boardDto);
	}
	
	@RequestMapping(value="/api/boardClone/{boardIdx}", method=RequestMethod.DELETE)
	public void deleteBoard(@PathVariable("boardIdx") int boardIdx) throws Exception {
		boardService.deleteBoard(boardIdx);
	}
}

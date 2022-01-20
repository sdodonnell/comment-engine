package models

type CommentRank int

const (
	Low CommentRank = iota
	Medium
	High
)

type CommentSection struct {
	FullName string      `json:"full_name"`
	ShortName string     `json:"short_name"`
	AssessedBy string    `json:"assessed_by"`
	Rank CommentRank     `json:"rank"`
	CustomComment string `json:"comment"`
}

type Comment struct {
	StudentName string 	      `json:"student_name"`
	Course string             `json:"course"`
	TermDescription string    `json:"term_description"`
	Sections []CommentSection `json:"skill_sets"`
	FutureComment string      `json:"future_comment"`
}
